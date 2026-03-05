import { useState } from "react";
import { Search, Bell, Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", color: "text-yellow-400 hover:text-yellow-300", to: "/" },
  { label: "Movies", color: "text-yellow-400 hover:text-yellow-300", to: "/?category=movies" },
  { label: "TV Shows", color: "text-yellow-400 hover:text-yellow-300", to: "/?category=series" },
  { label: "New & Popular", color: "text-yellow-400 hover:text-yellow-300", to: "/?category=new" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => setScrolled(window.scrollY > 50));
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-3xl tracking-wider text-primary">
            bodroq<span className="text-accent">.uz</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`font-body text-sm transition-colors ${link.color}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {searchOpen && (
              <motion.form
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                onSubmit={handleSearch}
                className="overflow-hidden"
              >
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded bg-secondary px-3 py-1.5 font-body text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border"
                />
              </motion.form>
            )}
          </AnimatePresence>
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors hidden md:block">
            <Bell className="h-5 w-5" />
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <span className="font-body text-xs text-accent">{user.user_metadata?.username || "User"}</span>
              <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login" className="font-body text-sm text-yellow-400 hover:text-yellow-300 transition-colors">Login</Link>
              <Link to="/register" className="rounded bg-primary px-3 py-1.5 font-body text-sm text-primary-foreground hover:bg-primary/80 transition-colors">Register</Link>
            </div>
          )}

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
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`text-left font-body transition-colors py-1 ${link.color}`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <button onClick={signOut} className="text-left font-body text-yellow-400 py-1">Sign Out</button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="text-left font-body text-yellow-400 py-1">Login</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="text-left font-body text-yellow-400 py-1">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
