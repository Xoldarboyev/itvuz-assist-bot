import { useState } from "react";
import { Search, Bell, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Home", "Movies", "Series", "New & Popular"];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => setScrolled(window.scrollY > 50));
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-8">
          <h1 className="font-display text-3xl tracking-wider text-primary">
            bodroq<span className="text-accent">.uz</span>
          </h1>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link}
                className="font-body text-sm text-secondary-foreground hover:text-foreground transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors hidden md:block">
            <Bell className="h-5 w-5" />
          </button>
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="flex flex-col gap-3 px-6 py-4">
              {navLinks.map((link) => (
                <button
                  key={link}
                  className="text-left font-body text-secondary-foreground hover:text-foreground transition-colors py-1"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
