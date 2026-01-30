import type { Metadata } from "next";
import Providers from "../components/Providers";
import "../styles/globals.css";
import { Toaster } from "@superdupersoftware/ui/Toast";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Super Duper Starter",
  description: "Template by super duper software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={jetBrainsMono.className}>
          <Toaster theme="system" />
          {children}
        </body>
      </Providers>
    </html>
  );
}
