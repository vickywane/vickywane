"use client"
import { ContentLayout } from "@/styles/index";
import cn from "classnames";

interface LayoutProps {
  children: any;
  bg?: string;
  classNames?: string;
}

const Layout = ({ children, bg, classNames}: LayoutProps) => (
  <ContentLayout bg={bg}>
    <div className={cn("content-elements", classNames)}>
      {children}
    </div>
  </ContentLayout>
);

export default Layout;