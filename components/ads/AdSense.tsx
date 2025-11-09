'use client'

import Script from 'next/script'

export default function AdSense() {
  return (
    <>
      <Script
        id="adsbygoogle-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-4297167192050875",
              enable_page_level_ads: true
            });
          `,
        }}
      />
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4297167192050875"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  )
}

