"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import TopNotice from "@/components/TopNotice";
import HeroSlider from "@/components/HeroSlider";
import OfferBanner from "@/components/OfferBanner";
import CategorySlider from "@/components/CategorySlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import BottomNav from "@/components/BottomNav";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

    if (!hasSeenSplash) {
      const showSplash = setTimeout(() => {
        setLoading(true);
      }, 0);

      const hideSplash = setTimeout(() => {
        sessionStorage.setItem("hasSeenSplash", "true");
        setLoading(false);
      }, 1200);

      return () => {
        clearTimeout(showSplash);
        clearTimeout(hideSplash);
      };
    }
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <main className="min-h-screen bg-gray-100 pb-24 md:pb-0">
      <TopNotice />
      <Header />
      <HeroSlider />
      <OfferBanner />
      <CategorySlider />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
      <FloatingActions />
      <BottomNav />
    </main>
  );
}
