import { StyledEngineProvider } from "@mui/system";
import "./App.css";

import MarketingPage from "./components/layouts/MarketingPage";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <MarketingPage />
    </StyledEngineProvider>
  );
}

export default App;
