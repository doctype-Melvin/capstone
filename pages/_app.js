import GlobalStyle from "../styles";
import { GlobalProvider } from "@/components/GlobalProvider";

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </GlobalProvider>
  );
}
