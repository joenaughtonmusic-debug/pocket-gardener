import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NotificationNavigator from "../components/NotificationNavigator";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Viewport handles the 'zoom' and 'theme color' for the phone's status bar
export const viewport: Viewport = {
  themeColor: "#2d5a3f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// 2. Metadata handles the Manifest, Icons, and Apple App settings
export const metadata: Metadata = {
  title: "Pocket Gardener",
  description: "Garden management for Aucklanders.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Pocket Gardener",
  },
  icons: {
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        Bootstrap script: runs synchronously when the browser parses the HTML,
        before React loads and before any useEffect fires.

        On Android cold start from a notification tap, MainActivity.java has
        already stored the deep-link path in coldStartNotificationPath and
        registered window.PGNative. This script reads it via the synchronous
        @JavascriptInterface call and writes it to sessionStorage immediately.

        Because this runs before React, WelcomeOverlay's hasPendingNotificationPath()
        check is always reliable — no race against evaluateJavascript or useEffect.
        NotificationNavigator (below) then consumes the key and navigates.
      */}
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var p=window.PGNative&&window.PGNative.getColdStartPath?window.PGNative.getColdStartPath():'';if(p){sessionStorage.setItem('pg:pending-notification-path',p);console.log('[PG_BOOTSTRAP] cold-start path written: '+p);}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <NotificationNavigator />
      </body>
    </html>
  );
}