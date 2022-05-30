import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="h-full">
      <Head />
      <body className="h-full bg-white antialiased font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
