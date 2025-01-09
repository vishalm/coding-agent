import type { Metadata } from "next";
import "next/head"
import { Inter } from "next/font/google";
import "./globals.css";
import { CopilotKit } from "@copilotkit/react-core"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding CoAgent",
  description: "CoAgent Demo App for Coding",
  icons: {
    icon: '/rdj.jpg', // /public path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" className="light">
      <body className={inter.className}>
      <CopilotKit 
          runtimeUrl="/api/copilotkit"
          agent="coding_assistant"
        >
          {children}
        </CopilotKit>
      </body>
    </html>
  );
}
