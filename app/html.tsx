import { ScrollViewStyleReset } from 'expo-router/html'
import type { PropsWithChildren } from 'react'

// This file is web-only and used to configure the root HTML for every
// web page during static rendering.
// The contents of this function only run in Node.js environments and
// do not have access to the DOM or browser APIs.
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="es" translate="no">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="google" content="notranslate" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1.00001, viewport-fit=cover"
        />
        <title>%WEB_TITLE%</title>
        <meta property="og:title" content="Base Expo Cross App by LeitesZeke" />
        <meta property="og:url" content="https://leites.dev/templates/base-expo-cross-app" />
        <meta property="og:image" content="./assets/og-image.png" />
        <meta property="og:description" content="Base Expo Cross App by LeitesZeke" />

        <meta name="twitter:title" content="Base Expo Cross App by LeitesZeke" />
        <meta name="twitter:description" content="Base Expo Cross App by LeitesZeke" />
        <meta name="twitter:image" content="./assets/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="stylesheet" type="text/css" href="./App.css" />
        <ScrollViewStyleReset />
      </head>

      <body>{children}</body>
    </html>
  )
}
