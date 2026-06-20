import { ReactNode } from "react";

export default function SectionContainer({ children, id }: { children: ReactNode, id?: string }) {
  return (
    <div id={id} className="mt-40 max-w-7xl mx-auto px-4 scroll-mt-40 md:mt-56 md:scroll-mt-56">
      {children}
    </div>
  );
}