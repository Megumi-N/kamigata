import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://kamigata.netlify.app'),
  title: 'KAMIGATA - メンズ髪型診断',
  description: '2択で直感的に髪型の傾向を診断。あなたに似合う髪型のスタイルを見つけよう。',
  keywords: ['髪型診断', 'メンズヘアスタイル', 'ヘアスタイル診断', '髪型', 'メンズ', '診断'],
  authors: [{ name: 'KAMIGATA' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://kamigata.netlify.app',
    siteName: 'KAMIGATA',
    title: 'KAMIGATA - メンズ髪型診断',
    description: '2択で直感的に髪型の傾向を診断。あなたに似合う髪型のスタイルを見つけよう。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KAMIGATA - メンズ髪型診断',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAMIGATA - メンズ髪型診断',
    description: '2択で直感的に髪型の傾向を診断。あなたに似合う髪型のスタイルを見つけよう。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className="antialiased"
        style={{
          fontFamily:
            "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
        }}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-382M1D6WJ9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-382M1D6WJ9');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
