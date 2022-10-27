import { StoreProvider } from "easy-peasy";
import { store } from "../store/store";
import { wrapper } from "../store/store";
import { ThemeProvider } from "@mui/material";
import theme from "../theme";
import "../../styles/CSSreset.css";
import "../../styles/globals.css";
import "../../styles/App.scss";
import "../../styles/NavBar.scss";
import "../../styles/buyButton.scss";

const StoreProviderOverride = StoreProvider as any;

function MyApp({ Component, pageProps }) {
  return (
    <StoreProviderOverride store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProviderOverride>
  );
}

export default wrapper.withRedux(MyApp);
// export default MyApp
