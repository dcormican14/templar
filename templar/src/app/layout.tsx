import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RoundTable } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Templar",
  description: "A modern React component library built with Next.js and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RoundTable
          config={{
            theme: {
              defaultTheme: 'system',
              storageKey: 'templar-theme',
            },
            auth: {
              storageKey: 'templar-auth',
            },
            toast: {
              maxToasts: 5,
              defaultDuration: 5000,
            },
            loading: {
              showGlobalSpinner: true,
            },
            modal: {
              maxModals: 3,
            },
            settings: {
              storageKey: 'templar-settings',
            },
          }}
        >
          {children}
        </RoundTable>
      </body>
    </html>
  );
}
