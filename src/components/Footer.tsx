
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-earth-forest/10 py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/67d9b570-bf37-4e7e-9d9c-e4bba69245d8.png" 
                alt="NomadTrails Logo" 
                className="h-12"
              />
            </div>
            <p className="text-foreground/70 max-w-sm">
              Empowering digital nomads with the tools and community they need to thrive anywhere in the world.
            </p>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3 text-foreground/70">
              <li><a href="#features" className="hover:text-foreground transition-colors">Features</a></li>
              <li><a href="#concierge" className="hover:text-foreground transition-colors">Concierge</a></li>
              <li><a href="#community" className="hover:text-foreground transition-colors">Community</a></li>
            </ul>
          </div>
          
          {/* Contact info */}
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <p className="text-foreground/70 mb-4">hello@explorenomad.com</p>
            
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-foreground/60 hover:text-earth-terracotta transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-foreground/60 hover:text-earth-terracotta transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-foreground/60 hover:text-earth-terracotta transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60">
            © {currentYear} Nomadic Trails. All rights reserved.
          </p>
          <p className="text-sm text-foreground/60 mt-2 md:mt-0">
            Made with love for the modern nomad.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
