import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppAppBar from "../AppAppBar";
import Footer from "../Footer";

const RootLayout = () => {
  const { Content } = Layout;

  return (
    <Layout style={{ height: "100vh" }}>
      <AppAppBar />
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};
export default RootLayout;
