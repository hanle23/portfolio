import Head from "next/head";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      // brand colors
      background: "#1d1d1d",
      text: "#fff",
      // you can also create your own color
      myDarkColor: "#ff4ecd",
      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{Component.title}</title>
        <meta name="description" content="Han Le's portfolio" />
      </Head>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <NextUIProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}
