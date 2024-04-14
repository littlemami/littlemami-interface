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

import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { mainnet, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { NextUIProvider } from "@nextui-org/react";
import useRem from "@/hooks/rem";
import { InjectedConnector } from "wagmi/connectors/injected";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [alchemyProvider({ apiKey: "LQ0xqhSEYELkJL2ToAS0S02mh8LiT_iR" })]
);

const injectedWallet = ({ chains }) => ({
  id: "injected",
  name: "OKX Wallet",
  iconUrl: "https://www.okx.com/cdn/assets/imgs/226/EB771F0EE8994DD5.png",
  iconBackground: "#fff",
  createConnector: () => ({
    connector: new InjectedConnector({
      chains,
    }),
  }),
});

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({
        chains,
        projectId: "2a612b9a18e81ce3fda2f82787eb6a4a",
      }),
    ],
  },
]);

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
    if (router.pathname === "/" || router.pathname === "/stake") {
      document.body.className = "";
    } else {
      document.body.className = "star";
    }
  }, [router]);
  return (
    <NextUIProvider>
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
    </NextUIProvider>
  );
}
