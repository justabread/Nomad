import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nomad",
  description: "A Text-Based Adventure",
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
