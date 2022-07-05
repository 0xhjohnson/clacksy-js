import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full">
      <Head />
      <body className="h-full bg-white font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
