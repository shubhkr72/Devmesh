import useUserInfo from "@/hooks/useUserInfo";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Outlet } from "react-router-dom";
import PageTransition from "@/components/ui/PageTransition";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Body = () => {
  const { user, authChecked, isPublicRoute } = useUserInfo();
  const location = useLocation();

  const needsAuth = !isPublicRoute;
  const showLoader = needsAuth && (!authChecked || !user);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      {showLoader ? (
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      ) : (
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      )}
      <Footer />
    </div>
  );
};

export default Body;
