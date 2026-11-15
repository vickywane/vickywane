"use client"
import { ContentLayout } from "@/styles/index";
import cn from "classnames";

interface LayoutProps {
  children: any;
  bg?: string;
  classNames?: string;
  /** Anchor id for in-page links; offset so the sticky header doesn't cover it */
  id?: string;
}

const Layout = ({ children, bg, classNames, id }: LayoutProps) => (
  <ContentLayout bg={bg} id={id} className={id ? "scroll-mt-[90px]" : undefined}>
    <div className={cn("content-elements", classNames)}>
      {children}
    </div>
  </ContentLayout>
);

export default Layout;