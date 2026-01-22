import type { Metadata } from "next";
import Providers from "../components/Providers";

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
        <body>{children}</body>
      </Providers>
    </html>
  );
}
