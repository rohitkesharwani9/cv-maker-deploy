import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

const GoogleAd = () => {
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
    <div className="print:hidden mt-5 mb-5">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2305974348753248"
        data-ad-slot="1051403388"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default GoogleAd;