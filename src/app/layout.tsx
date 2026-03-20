import type { Metadata } from "next";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codebara | Code Craftsman",
  description:
    "Freelance full-stack developer specializing in Java Spring Boot, React, and DevOps. Building robust, scalable applications.",
  keywords: [
    "full-stack developer",
    "Spring Boot",
    "React",
    "DevOps",
    "freelance",
  ],
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "96x96" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} antialiased bg-onyx text-cream`}
      >
        {children}
      </body>
    </html>
  );
}
