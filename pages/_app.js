import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import App from "next/app";
import { wrapper } from "../store/index";
import Axios from "axios";
import "../styles/layout/index.scss"
import cookieparser from "cookieparser";
import {parseCookies, setCookie} from "nookies";
import Header from "../components/layout/Header";
function MyApp({ Component, pageProps }) {
  const [drawerOpened, setDrawerOpened] = React.useState(false)
  return (
      <div className={"grid-container"}>
        <Header/>
        <div className={"main"}>
          <Component {...pageProps} />
        </div>
      </div>
      );
}

MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  if (appContext.ctx.req && appContext.ctx.req.headers.cookie) {
    const cookies = parseCookies(appContext.ctx)
    if (cookies.user) {
      try {
        const res = await Axios({
          method: "get",
          url: `${process.env.baseUrl}/api/auth/me`,
          headers: { cookie: appContext.ctx.req.headers.cookie },
          data: {user: cookies.user}
        });
        if (res.data.ok) {
          appContext.ctx.store.dispatch({
            type: "SET_USER",
            payload: res.data.user,
          });
        }
      } catch {}
    }
    //const res = await console.log(process.env.baseUrl);
    //appContext.ctx.store.dispatch
  }
  // const res = await Axios.post(`${process.env.baseUrl}/api/auth/login`, {
  //   email: "dislive@gmail.com",
  //   password: "irkytsk87",
  // }).then((res) => {
  //   if (res.data.hashedEmail) {
  //     setCookie(appContext.ctx, 'user', res.data.hashedEmail)
  //   }
  // });

  return { ...appProps };
};

export default wrapper.withRedux(MyApp);
