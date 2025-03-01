import type { NextPage } from 'next';
import styled from 'styled-components';
import Head from 'next/head';
import Hero from 'src/home/hero';
import Features from 'src/home/features';
import NavBar from 'src/home/navbar';
import GoogleAd from "../components/GoogleAd";

const Main = styled.main`
  padding: 10px 5% 0;
  margin: auto;
  max-width: 1200px;

  & > div {
    margin-bottom: 25px;
  }
`;

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CV Maker Pro</title>
        <meta name="description" content="Free CV Maker" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/draggar.css"></link>
        {/* Google Analytics Script */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q6S926GZYM"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q6S926GZYM');
            `,
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2305974348753248"
     crossOrigin="anonymous"></script>  
      </Head>

      <Main>
        <div>
          <span id="navbar1">
            <b>CV Maker Pro</b>
          </span>
        </div>
        {/* <br /> */}
        {/* Google AdSense Ad Unit */}
      <div id='ads1'>
      <GoogleAd />
      </div>
        <NavBar />
        <Hero />
        <Features />
      </Main>
    </>
  );
};

export default Home;
