import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sideber from "./Sideber";

const RootLayout = () => {
  const { Content } = Layout;

  return (
    <Layout style={{ height: "100vh" }}>
      <Sideber />
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default RootLayout;
