import { Suspense } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${process.env.PORT || 3000}`;
const title = "Scaffold-Stark";
const titleTemplate = "%s | Scaffold-Stark ";
const description = "Open-source toolkit for building dApps on Starknet";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-grotesk",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: titleTemplate,
  },
  description,
  openGraph: {
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
    images: [`${baseUrl}/scaffold-twitter.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    site: baseUrl,
    creator: "@scaffoldstark",
    images: [`${baseUrl}/scaffold-twitter.jpg`],
    title: {
      default: title,
      template: titleTemplate,
    },
    description,
  },
  icons: {
    icon: [{ url: "/logo.ico", sizes: "32x32", type: "image/ico" }],
  },
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning className={`${spaceGrotesk.variable}  ${inter.variable}`}>
      <body>
        <Suspense fallback={<>Loading...</>}>
          <ThemeProvider enableSystem>
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
