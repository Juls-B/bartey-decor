import { ReactNode } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CONTACT } from "@/lib/contact";

interface LayoutProps {
  children: ReactNode;
}

const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        className="flex-1"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href={CONTACT.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Bartey Decor on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 h-14 px-5 rounded-full shadow-xl bg-[#25D366] text-white hover:brightness-110 transition-all duration-300 group"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium tracking-wide">WhatsApp</span>
      </a>
    </div>
  );
};
