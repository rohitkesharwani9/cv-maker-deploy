import type { NextPage } from 'next';
import styled from 'styled-components';
import Head from 'next/head';
import Hero from 'src/home/hero';
import Features from 'src/home/features';
import NavBar from 'src/home/navbar';
import GoogleAd from "../components/GoogleAd";
import { useEffect } from 'react';

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1400px;
  margin: auto;
  padding: 10px 20px;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1000px;
  padding: 10px 0;
  & > div {
    margin-bottom: 25px;
  }
`;

const Home: NextPage = () => {
  useEffect(() => {
    const initAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          window.adsbygoogle.push({}); // Initialize single ad
        }
      } catch (e) {
        console.error("Adsbygoogle failed to load", e);
      }
    };

    // Initial attempt
    initAd();
    
    // Retry after delays
    const timer1 = setTimeout(initAd, 1000);
    const timer2 = setTimeout(initAd, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

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

      <div id="navbar1">
        <span>
          <b>CV Maker Pro</b>
        </span>
      </div>

      <PageLayout>
        <MainContent>
          <GoogleAd />
          <NavBar />
          <Hero />
          <Features />
        </MainContent>
      </PageLayout>
    </>
  );
};

export default Home;