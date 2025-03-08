import { useEffect } from "react";
import styled from "styled-components";

interface AdContainerProps {
  isVertical?: boolean;
}

const AdContainer = styled.div<AdContainerProps>`
  background-color: #f5f5f5;
  border: 2px solid #ddd;
  padding: 10px;
  text-align: center;
  margin: ${props => props.isVertical ? '10px 0' : '33px 0 10px 0'};
  ${props => props.isVertical && `
    min-height: 600px;
    width: 100%;
  `}
`;

const AdLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
`;

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

interface GoogleAdProps {
  isVertical?: boolean;
}

const GoogleAd = ({ isVertical = false }: GoogleAdProps) => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.adsbygoogle) {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.error("Adsbygoogle failed to load", e);
      }
    }
  }, []);

  return (
    <AdContainer isVertical={isVertical} className="print:hidden">
      <AdLabel>Advertisement</AdLabel>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2305974348753248"
        data-ad-slot={isVertical ? "1051403389" : "1051403388"}
        data-ad-format={isVertical ? "vertical" : "auto"}
        data-full-width-responsive={!isVertical}
      ></ins>
    </AdContainer>
  );
};

export default GoogleAd;