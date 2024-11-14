import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/src/components/ui/layout/LayoutWrapper";
import { inter } from "@/app/lib/fonts";
import { SuppressHydrationWarning } from "@/src/components/SuppressHydrationWarning";
import { ReduxProvider } from "./lib/redux/Provider";
export const metadata: Metadata = {
  title: "VivoSynchealth-Medical App",
  description: "Just testing"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SuppressHydrationWarning />
        <ReduxProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
