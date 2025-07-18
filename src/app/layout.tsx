import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "./providers/session-provider";

const onestSans = Onest({
  variable: "--font-onest-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polyglota.me",
  description: "Chega mais! Faça suas reuniões em qualquer idioma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onestSans.variable} antialiased`}
        style={{
          background: "#1c2127",
        }}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
