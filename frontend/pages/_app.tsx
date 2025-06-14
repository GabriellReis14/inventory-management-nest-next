import type { AppProps } from "next/app";
import type { Page } from "../types/types";
import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import { ApolloProvider } from "@apollo/client";
import client from "./api/apolloClient";
import { ConfirmDialog } from "primereact/confirmdialog";

type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  if (Component.getLayout) {
    return (
      <LayoutProvider>
        {Component.getLayout(<Component {...pageProps} />)}
      </LayoutProvider>
    );
  } else {
    return (
      <ApolloProvider client={client}>
        <LayoutProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LayoutProvider>
        {/* The ConfirmDialog component is used for confirmation dialogs in the application */}
        <ConfirmDialog />
      </ApolloProvider>
    );
  }
}
