import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTemplates, useZoom } from 'src/stores/settings.store';
import { useThemes } from 'src/stores/theme.store';
import { ThemeProvider } from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  align-items: center; /* Center align */
  width: 100%;
`;

const AdContainer = styled.div`
  width: 80% !important;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 33px;
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  padding: 10px;

  @media print {
    display: none; /* Hide ads when printing */
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
    transform: none;
  }
`;

export function Resume() {
  const [adHeight, setAdHeight] = useState(0);
  const Template = useTemplates((state: any) => state.template);
  const zoom = useZoom((state: any) => state.zoom);
  const theme = useThemes((state: any) => state.theme);

  useEffect(() => {
    const adContainer = document.getElementById('ads');
    if (adContainer) {
      setAdHeight(adContainer.offsetHeight);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <PageWrapper>
        {/* Google Ads Section */}
        <AdContainer id="ads">
          <p style={{ fontSize: 'medium' }}><b>Internet required for full functionality</b></p>
          <p style={{ fontSize: 'medium' }}><b>Advertisement</b></p>
          {/* Replace with your actual Google AdSense code */}
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <ins className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-2305974348753248"
            data-ad-slot="1051403388"
            data-ad-format="auto"
            data-full-width-responsive="true"></ins>
          <script>
            {`(adsbygoogle = window.adsbygoogle || []).push({});`}
          </script><br />
        </AdContainer>

        {/* Resume Section */}
        <ResumeContainer className="resume" zoom={zoom}>
          <Template />
        </ResumeContainer>
      </PageWrapper>
    </ThemeProvider>
  );
}
