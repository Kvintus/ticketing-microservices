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

const { Footer, Sider, Content } = Layout;

const AppComponent = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
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
