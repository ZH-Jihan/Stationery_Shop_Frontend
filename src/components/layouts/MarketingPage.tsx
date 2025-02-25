import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import AppAppBar from "../../components/AppAppBar";
import Footer from "../../components/Footer";
import AppTheme from "../../theme/AppTheme";

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div>
        <AppAppBar />
      </div>

        <Outlet />
        {/* <LogoCollection /> */}
        {/* <Features /> */}
        {/* <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider /> */}
      <Footer />
    </AppTheme>
  );
}
