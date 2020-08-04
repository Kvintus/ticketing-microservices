import { Layout } from "antd";
import { createWrapper, Context } from "next-redux-wrapper";
import { AppContext } from "next/app";
import { Provider } from "react-redux";
import { buildClient } from "../api/build-client";
import { Header } from "../components/Shared/Header/Header";
import { signIn } from "../store/slices/userSlice";
import store from "../store/store";
import "../styles/antd.less";
import "../styles/globals.css";
import Head from "next/head";

const { Footer, Sider, Content } = Layout;

const AppComponent = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
      <Head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
        <Header />
        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </Provider>
  );
};

AppComponent.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const client = buildClient(ctx);
  const { data } = await client.get("/api/users/currentuser");

  if (typeof window === "undefined") {
    ctx.store.dispatch(signIn(data.currentUser));
  }

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export const wrapper = createWrapper(
  (context: Context) => {
    return store;
  },
  { debug: true }
);

export default wrapper.withRedux(AppComponent);
