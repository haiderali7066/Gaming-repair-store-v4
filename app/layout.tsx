import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: { default: "Al Dana Gaming", template: "%s | Al Dana Gaming" },
  description:
    "Gaming PCs, laptops, phones, expert repairs, and device trade-ins in the UAE.",
};
export const viewport: Viewport = {
  themeColor: "#0b0c0c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${roboto.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
