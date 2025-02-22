import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { persistStor, store } from "./redux/store.ts";
import { route } from "./routes/routes.tsx";
// import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistStor}>
        <RouterProvider router={route} />
      </PersistGate>
      <Toaster />
    </Provider>
  </StrictMode>
);
