import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/routes/index/HeroSection";
import AppHeader from "@/components/shared/AppHeader";
import AppDetails from "@/components/routes/index/AppDetails";
import AppFooter from "@/components/shared/AppFooter";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="flex flex-col items-center">
      <AppHeader />
      <HeroSection />
      <AppDetails />
      <AppFooter />
    </main>
  );
}
