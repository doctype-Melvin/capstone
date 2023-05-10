import GlobalStyle from "../styles";
import { GlobalProvider } from "@/components/GlobalProvider";
import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <Layout>
        <GlobalStyle />
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  );
}
