import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{Component.title}</title>
        <meta name="description" content="Han Le's portfolio" />
      </Head>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}
