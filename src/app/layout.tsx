import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAMIGATA - メンズ髪型診断",
  description: "2択×10で直感的に髪型の傾向を診断",
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
        style={{ fontFamily: "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
