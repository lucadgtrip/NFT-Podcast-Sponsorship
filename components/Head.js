import React from 'react';
import { default as HTMLHead } from "next/head"; // Meta
/**
 * Meta HTML Head
 * @returns {ReactElement} HTML Head component
 */
function Head() {
  return (
    <HTMLHead>
      {/* Primary Meta Tags */}
      <title>The Podcast Support NFT</title>
      <meta name="title" content="The Podcast Support NFT" />
      <meta
        name="description"
        content="The Podcast Support NFT: donate to the podcast by minting a ticket, become a sponsor and be mentioned in the podcast."
      />

      {/* OG + Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.podcast.web3intravel.com/" />
      <meta property="og:title" content="The Podcast Support NFT" />
      <meta
        property="og:description"
        content="The Podcast Support NFT: donate to the podcast by minting a ticket, become a sponsor and be mentioned in the podcast."
      />
      <meta property="og:image" content="www.podcast.web3intravel.com/meta.png" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.podcast.web3intravel.com/" />
      <meta property="twitter:title" content="The Podcast Support NFT" />
      <meta
        property="twitter:description"
        content="The Podcast Support NFT: donate to the podcast by minting a ticket, become a sponsor and be mentioned in the podcast."
      />
      <meta property="twitter:image" content="https://www.podcast.web3intravel.com/meta.png" />

      {/* Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link rel = "stylesheet" href = "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
    </HTMLHead>
  );
}
export default Head;
