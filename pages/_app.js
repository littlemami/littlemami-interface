import "@/styles/globals.css";
import "@/styles/index.scss";
import "animate.css";

import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "@rainbow-me/rainbowkit/styles.css";
import { useRouter } from "next/router";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import useRem from "@/hooks/rem";

const { chains, publicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: "LQ0xqhSEYELkJL2ToAS0S02mh8LiT_iR" })]
);
const { connectors } = getDefaultWallets({
  appName: "App",
  projectId: "2a612b9a18e81ce3fda2f82787eb6a4a",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function App({ Component, pageProps }) {
  const [size] = useRem();
  const router = useRouter();
  const rainbowKitConfig = {
    chains: chains,
    showRecentTransactions: true,
    coolMode: true,
    locale: "en-US",
  };

  useEffect(() => {
    if (router.pathname === "/") {
      document.body.className = "";
    } else {
      document.body.className = "star";
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Littlemami</title>
      </Head>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider {...rainbowKitConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
