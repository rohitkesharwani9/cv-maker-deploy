import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTemplates, useZoom } from 'src/stores/settings.store';
import { useThemes } from 'src/stores/theme.store';
import { ThemeProvider } from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 33px;

  @media print {
    margin-top: 0;
  }
`;

const AdContainer = styled.div`
  width: 80% !important;
  text-align: center;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  padding: 10px;
  min-height: 100px;

  @media print {
    display: none;
    margin: 0;
    padding: 0;
    height: 0;
  }
`;

const ResumeContainer: any = styled.div`
  width: 210mm;
  height: 296mm;
  background-color: white;
  border: 1px solid ${(props) => props.theme.fontColor};
  margin: 6mm;
  transform-origin: top;
  transform: ${({ zoom }: any) => `scale(${1 + zoom})`};
  margin-bottom: ${({ zoom }: any) => {
    if (zoom < 0) return 260 * zoom;
    if (zoom > 0) return 320 * zoom;
    return 6;
  }}mm;

  @media print {
    border: none;
    overflow: inherit;
    margin: 0;
    padding: 0;
    transform: none;
    height: 100%;
    page-break-before: avoid;
    page-break-after: avoid;
  }
`;

export function Resume() {
  const Template = useTemplates((state: any) => state.template);
  const zoom = useZoom((state: any) => state.zoom);
  const theme = useThemes((state: any) => state.theme);
  const [adInitialized, setAdInitialized] = useState(false);

  useEffect(() => {
    // Initialize ad after component mounts
    const initializeAd = () => {
      if (window.adsbygoogle && !adInitialized) {
        try {
          window.adsbygoogle.push({});
          setAdInitialized(true);
        } catch (e) {
          console.error("Ad initialization failed:", e);
        }
      }
    };

    // Try to initialize immediately and also after a delay
    initializeAd();
    const timer = setTimeout(initializeAd, 1000);

    return () => clearTimeout(timer);
  }, [adInitialized]);

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        {/* Google Ads Section */}
        <AdContainer id="ads">
          <p style={{ fontSize: 'medium' }}><b>Internet required for full functionality</b></p>
          <p style={{ fontSize: 'medium' }}><b>Advertisement</b></p>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-2305974348753248"
            data-ad-slot="1051403388"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </AdContainer>

        {/* Resume Section */}
        <ResumeContainer className="resume" zoom={zoom}>
          <Template />
        </ResumeContainer>
      </PageWrapper>
    </ThemeProvider>
  );
}
