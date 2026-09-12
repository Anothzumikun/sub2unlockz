import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Unlock Link",
  description: "Sub2Unlock personal link gate",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
