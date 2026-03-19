import { ReactNode } from "react";

export default function SectionContainer({ children, id }: { children: ReactNode, id?: string }) {
  return (
    <div id={id} className="mt-48 px-4 scroll-mt-48">
      {children}
    </div>
  );
}