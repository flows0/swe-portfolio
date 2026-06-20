"use client";

import { useEffect, useMemo, useState } from "react";

/** Shared across hook instances — suppresses intermediate highlights while scrolling to a clicked section. */
let navigationLockId: string | null = null;
let navigationLockFromScrollY = 0;
let navigationLockTargetScrollY = 0;
let navigationLockTimeoutId: number | null = null;
let navClickListenerAttached = false;
const registeredSectionIds: { current: string[] } = { current: [] };

const NAVIGATION_LOCK_MAX_MS = 1500;

function clearNavigationLockTimeout() {
  if (navigationLockTimeoutId !== null) {
    window.clearTimeout(navigationLockTimeoutId);
    navigationLockTimeoutId = null;
  }
}

function setNavigationLock(id: string, activeSectionOffsetPx: number) {
  navigationLockId = id;
  navigationLockFromScrollY = window.scrollY;

  const el = document.getElementById(id);
  navigationLockTargetScrollY = el
    ? el.getBoundingClientRect().top + window.scrollY - activeSectionOffsetPx
    : navigationLockFromScrollY;

  clearNavigationLockTimeout();
  navigationLockTimeoutId = window.setTimeout(() => {
    navigationLockId = null;
    navigationLockTimeoutId = null;
    window.dispatchEvent(new Event("scroll"));
  }, NAVIGATION_LOCK_MAX_MS);
}

function attachNavClickListener(sectionIds: string[], activeSectionOffsetPx: number) {
  registeredSectionIds.current = sectionIds;
  if (navClickListenerAttached) return;
  navClickListenerAttached = true;

  const isSectionId = (id: string | null): id is string =>
    Boolean(id && registeredSectionIds.current.includes(id));

  const lockFromHref = (href: string | null) => {
    const id = href ? getSectionIdFromHref(href) : null;
    if (isSectionId(id)) setNavigationLock(id, activeSectionOffsetPx);
  };

  document.addEventListener(
    "click",
    (event) => {
      const anchor = (event.target as Element).closest('a[href*="#"]');
      if (!(anchor instanceof HTMLAnchorElement)) return;
      lockFromHref(anchor.getAttribute("href"));
    },
    true,
  );

  window.addEventListener("hashchange", () => {
    const hashId = window.location.hash
      ? decodeURIComponent(window.location.hash.slice(1))
      : null;
    if (isSectionId(hashId)) setNavigationLock(hashId, activeSectionOffsetPx);
  });
}

function hasReachedLockedSection(
  lockedId: string,
  currentId: string | null,
  sectionIds: string[],
  activeSectionOffsetPx: number,
): boolean {
  if (currentId === lockedId) return true;

  const lockedEl = document.getElementById(lockedId);
  if (lockedEl) {
    const top = lockedEl.getBoundingClientRect().top;
    if (top - activeSectionOffsetPx <= 0 && lockedEl.getBoundingClientRect().bottom > 0) {
      return true;
    }
  }

  const currentY = window.scrollY;
  const scrollingDown = navigationLockTargetScrollY >= navigationLockFromScrollY;
  const arrived =
    Math.abs(currentY - navigationLockTargetScrollY) <= activeSectionOffsetPx ||
    (scrollingDown
      ? currentY >= navigationLockTargetScrollY - 50
      : currentY <= navigationLockTargetScrollY + 50);
  if (arrived) return true;

  const lockedIndex = sectionIds.indexOf(lockedId);
  const currentIndex = currentId ? sectionIds.indexOf(currentId) : -1;
  if (currentIndex > lockedIndex && scrollingDown) return true;
  if (currentIndex !== -1 && currentIndex < lockedIndex && !scrollingDown) return true;

  const lastId = sectionIds[sectionIds.length - 1];
  if (lockedId !== lastId) return false;

  const scrollBottom = window.innerHeight + window.scrollY;
  const pageBottom = document.documentElement.scrollHeight;
  return scrollBottom >= pageBottom - 2;
}

export function getSectionIdFromHref(href: string): string | null {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const hash = href.slice(hashIndex + 1);
  if (!hash) return null;
  return decodeURIComponent(hash);
}

export type UseScrollSpyParams = {
  /**
   * Hrefs like `"/#about"` or `"/#projects"`; the hash fragment is used as the section id.
   */
  sectionHrefs: string[];
  /**
   * Approximate "top threshold" used to decide which section is active.
   */
  activeSectionOffsetPx?: number;
  /**
   * When false, avoids registering scroll/resize listeners.
   */
  enabled?: boolean;
};

export const ACTIVE_SECTION_OFFSET_PX = 500;

export function useScrollSpy({
  sectionHrefs,
  activeSectionOffsetPx = ACTIVE_SECTION_OFFSET_PX,
  enabled = true,
}: UseScrollSpyParams) {
  const sectionIds = useMemo(
    () => sectionHrefs.map(getSectionIdFromHref).filter((v): v is string => Boolean(v)),
    [sectionHrefs],
  );

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  useEffect(() => {
    attachNavClickListener(sectionIds, activeSectionOffsetPx);
  }, [sectionIds, activeSectionOffsetPx]);

  useEffect(() => {
    if (!enabled) return;

    let rafId: number | null = null;

    const computeActiveSection = () => {
      const elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (elements.length === 0) return;

      // Sort by actual position in the document.
      elements.sort(
        (a, b) =>
          a.getBoundingClientRect().top + window.scrollY - (b.getBoundingClientRect().top + window.scrollY),
      );

      let currentId: string | null = elements[0]?.id ?? null;
      for (const el of elements) {
        const topRelativeToViewport = el.getBoundingClientRect().top;
        if (topRelativeToViewport - activeSectionOffsetPx <= 0) {
          currentId = el.id;
        } else {
          break;
        }
      }

      const lockedId = navigationLockId;
      if (lockedId && sectionIds.includes(lockedId)) {
        if (hasReachedLockedSection(lockedId, currentId, sectionIds, activeSectionOffsetPx)) {
          clearNavigationLockTimeout();
          navigationLockId = null;
          setActiveSectionId((prev) => (prev === currentId ? prev : currentId));
        }
        return;
      }

      setActiveSectionId((prev) => (prev === currentId ? prev : currentId));
    };

    const scheduleCompute = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        computeActiveSection();
      });
    };

    const initFromHashOrScroll = () => {
      computeActiveSection();
    };

    initFromHashOrScroll();
    window.addEventListener("scroll", scheduleCompute, { passive: true });
    window.addEventListener("resize", scheduleCompute);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleCompute);
      window.removeEventListener("resize", scheduleCompute);
    };
  }, [enabled, sectionIds, activeSectionOffsetPx]);

  return { activeSectionId, sectionIds } as const;
}

