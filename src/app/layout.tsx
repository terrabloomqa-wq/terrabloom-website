import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";

export const metadata: Metadata = {
  title: "Terra Bloom — A World Within Glass | Handcrafted Terrariums",
  description: "Discover handcrafted terrariums, miniature ecosystems, and living art pieces. Each terrarium is carefully crafted to bring nature's calm into your space. Shop closed terrariums, open terrariums, paludariums, kits & accessories.",
  keywords: "terrariums, handcrafted terrariums, miniature ecosystems, indoor plants, closed terrariums, open terrariums, paludariums, terrarium kits, plant gifts, eco-friendly gifts",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
