import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
