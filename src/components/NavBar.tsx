
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-background/80 backdrop-blur-lg shadow-sm' : 'py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative">
            <h1 className="text-xl md:text-2xl font-serif font-bold">
              NomadTrails
            </h1>
            <div className="absolute -inset-1 bg-earth-terracotta/20 rounded-full blur-md -z-10 animate-pulse-glow"></div>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">Features</a>
          <a href="#concierge" className="text-foreground/80 hover:text-foreground transition-colors">Concierge</a>
          <a href="#community" className="text-foreground/80 hover:text-foreground transition-colors">Community</a>
          <Button className="bg-earth-terracotta hover:bg-earth-terracotta/90 text-white">Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="py-3 text-foreground" 
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#concierge" 
              className="py-3 text-foreground" 
              onClick={() => setIsMenuOpen(false)}
            >
              Concierge
            </a>
            <a 
              href="#community" 
              className="py-3 text-foreground" 
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </a>
            <Button 
              className="bg-earth-terracotta hover:bg-earth-terracotta/90 text-white" 
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
