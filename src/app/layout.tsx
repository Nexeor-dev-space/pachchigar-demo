import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Pachchigar & Sons | Heritage Crafted Luxury Jewellers Since Generations",
  description:
    "Discover timeless heritage jewelry crafted with generations of artistry. Pachchigar & Sons brings Surat's legacy of handcrafted luxury, traditional Pachchi work, and emotional storytelling to every jewel.",
  keywords:
    "Pachchigar and Sons, PSJ, heritage jewelry, luxury jewellers, Surat, Pachchi work, handcrafted jewelry, Indian jewelry, diamond rings, gold necklaces",
  openGraph: {
    title: "Pachchigar & Sons | Heritage Crafted Luxury Jewellers",
    description:
      "When every jewel becomes a story. Discover the timeless legacy of Pachchigar & Sons, heritage crafted luxury from Surat.",
    type: "website",
    url: "https://pachchigarandsons.com",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AnimationProvider } from "@/providers/AnimationProvider";
import { CartProvider } from "@/providers/CartProvider";
import { WishlistProvider } from "@/providers/WishlistProvider";
import AnimationToggle from "@/components/AnimationToggle";
import { AuthProvider } from "@/providers/AuthProvider";
import OnboardingPopup from "@/components/OnboardingPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AnimationProvider>
              <Navbar />
              <SmoothScrollProvider>
                <div className="flex-grow">
                  {children}
                </div>
                <Footer />
              </SmoothScrollProvider>
              <AnimationToggle />
              <OnboardingPopup />
            </AnimationProvider>
          </WishlistProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
