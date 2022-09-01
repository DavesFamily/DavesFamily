import { Global, css, connect, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";
import Header from "./header";
import Footer from "./footer";
//import List from   "./list";
import Home from "./home";
//import HomeNew from "./home-new";
//import MintPage from "./mint-page"
import GeneralPage from "./general-page"
import Post from "./post";
import Loading from "./loading";
import Title from "./title";
import PageError from "./page-error";
import customBootstrap from "bootstrap/dist/css/bootstrap.min.css";
import customStyles from "../assets/css/style.css";
import menuStyles from "../assets/css/menu.css";
//import slickStyle from "slick-carousel/slick/slick.css";
//import slickTheme from "slick-carousel/slick/slick-theme.css";
import circularProgressBar from "react-circular-progressbar/dist/styles.css";

import BimboJVETTF from "../assets/font/Bimbo_JVE.ttf";
import AlphakindTTF from "../assets/font/Alphakind.ttf";
import AlphakindOTF from "../assets/font/Alphakind.ttf";

import ModulesEOT from "../assets/font/modules.eot";
import ModulesTTF from "../assets/font/modules.ttf";
import ModulesWOFF from "../assets/font/modules.woff";

import SociconEOT from "../assets/font/Socicon.eot";
import SociconWOFF2 from "../assets/font/Socicon.woff2";
import SociconWOFF from "../assets/font/Socicon.woff";
import SociconTTF from "../assets/font/Socicon.ttf";
import favicon from "../assets/images/favicon.png";
/**
 * Theme is the root React component of our theme. The one we will export
 * in roots.
 *
 * @param props - The props injected by Frontity's {@link connect} HOC.
 *
 * @returns The top-level react component representing the theme.
 */
const Theme = ({ state }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  const curentURL = state.router.link;
  return (
    <>
      {/* Add some metatags to the <head> of the HTML. */}
      <Title />
      <Head>
        <meta name="description" content={state.frontity.description} />
        <html lang="en" />
        <link rel="icon" href={favicon} sizes="150x150" />
        <link rel="apple-touch-icon" href={favicon} />
        <meta name="msapplication-TileImage" content={favicon} />
        <link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
	      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
      </Head>

      {/* Add some global styles for the whole site, like body or a's. 
      Not classes here because we use CSS-in-JS. Only global HTML tags. */}
      <Global styles={[customBootstrap, globalStyles, customStyles, menuStyles, circularProgressBar]} />

      {/* Add the header of the site. */}
      <div><Header /></div>

      {/* Add the main section. It renders a different component depending
      on the type of URL we are in. */}
      <div>
        <Switch>
          <Loading when={data.isFetching} />
          <Home when={data.isHome} />
          <GeneralPage when={data.isPage && curentURL.includes('/react-home/')} />
          <GeneralPage when={data.isPage && curentURL.includes('/mint/')} />
         {/* <List when={data.isArchive} />*/}
          <Post when={data.isPostType} />
          <PageError when={data.isError} />
        </Switch>
      </div>

      <Footer />

    </>
  );
};

export default connect(Theme);

const globalStyles = css`
    @font-face{
      font-family:"bimbo_jve";
      font-display:swap;
      src:url("${BimboJVETTF}") format("truetype")
    }

    @font-face{
      font-family:"alphakind";
      font-display:swap;
      src:url("${AlphakindTTF}") format("truetype"),url("${AlphakindOTF}") format("opentype")
  }

  @font-face{
    font-family:ETmodules;
    font-display:block;
    src:url("${ModulesEOT}");
    src:url("${ModulesEOT}?#iefix") format("embedded-opentype"),url("${ModulesTTF}") format("truetype"),url("${ModulesWOFF}") format("woff"),url(http//wp.daves.family/wp-content/themes/Divi/core/admin/fonts/modules/all/modules.svg#ETmodules) format("svg");
    font-weight:400;
    font-style:normal
  }

  @font-face {
    font-family: 'Socicon';
    src:  url('${SociconEOT}?87visu');
    src:  url('${SociconEOT}?87visu#iefix') format('embedded-opentype'),
    url('${SociconWOFF2}?87visu') format('woff2'),
    url('${SociconTTF}?87visu') format('truetype'),
    url('${SociconWOFF}?87visu') format('woff'),
    url('http://wp.daves.family/wp-content/plugins/divi-booster/core/icons/socicon/fonts/Socicon.svg?87visu#Socicon') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }
`;
