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
  margin: ${props => props.isVertical ? '10px 0' : '20px 0 10px 0'};
  ${props => props.isVertical && `
    min-height: 600px;
    width: 100%;
    display: flex;
    flex-direction: column;
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
    const initAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error("Adsbygoogle failed to load", e);
      }
    };

    // Initial attempt
    initAd();
    
    // Retry after a delay
    const timer = setTimeout(initAd, 1000);
    
    // Additional retry for vertical ads
    let verticalTimer: NodeJS.Timeout;
    if (isVertical) {
      verticalTimer = setTimeout(initAd, 2000);
    }

    return () => {
      clearTimeout(timer);
      if (verticalTimer) clearTimeout(verticalTimer);
    };
  }, [isVertical]);

  return (
    <AdContainer isVertical={isVertical} className="print:hidden">
      <AdLabel>Advertisement</AdLabel>
      <ins
        className="adsbygoogle"
        style={{ 
          display: "block",
          width: isVertical ? "300px" : "100%",
          height: isVertical ? "600px" : "auto"
        }}
        data-ad-client="ca-pub-2305974348753248"
        data-ad-slot={isVertical ? "1051403389" : "1051403388"}
        data-ad-format={isVertical ? "vertical" : "auto"}
        data-full-width-responsive={!isVertical}
      ></ins>
    </AdContainer>
  );
};

export default GoogleAd;