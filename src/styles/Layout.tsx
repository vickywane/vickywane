import { ContentLayout } from "@/styles/index";

interface LayoutProps {
  children: any;
  bg?: string;
}

const Layout = ({ children, bg }: LayoutProps) => (
  <ContentLayout bg={bg}>
    <div className={"content-elements"}>
      {children}
    </div>
  </ContentLayout>
);

export default Layout;