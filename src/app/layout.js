import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shade a Box",
  description: "App used to help artists study the values of basic forms.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <footer className="text-center text-sm text-gray-500 mt-8">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://gschowalter.github.io/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Grant Schowalter
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
