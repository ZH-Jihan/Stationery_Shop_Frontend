import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Carousel } from "antd";
import AppAppBar from "../../components/AppAppBar";
import FAQ from "../../components/FAQ";
import Footer from "../../components/Footer";
import Highlights from "../../components/Highlights";
import LogoCollection from "../../components/LogoCollection";
import Pricing from "../../components/Pricing";
import Testimonials from "../../components/Testimonials";
import AppTheme from "../../theme/AppTheme";
const contentStyle: React.CSSProperties = {
  height: "500px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      {/* <Hero /> */}
      <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div>
        <LogoCollection />
        {/* <Features /> */}
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
