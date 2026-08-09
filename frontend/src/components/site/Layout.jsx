import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

export function Layout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="bg-[#050B14] min-h-screen">
      <SmoothScroll />
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
