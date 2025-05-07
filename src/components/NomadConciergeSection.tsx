
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Airplane, FileText, Users, Building, Coffee, Search } from 'lucide-react';

const NomadConciergeSection = () => {
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = () => {
    setIsAnimating(true);
    
    toast({
      title: "Coming Soon!",
      description: "The Nomadic Concierge is currently in development.",
      variant: "default"
    });
    
    setTimeout(() => setIsAnimating(false), 2000);
  };
  
  // Feature cards data
  const features = [
    {
      icon: <Airplane className="h-8 w-8 text-earth-terracotta" />,
      title: "Visa Help",
      description: "Get personalized visa requirements and application assistance for any country."
    },
    {
      icon: <Search className="h-8 w-8 text-earth-terracotta" />,
      title: "Smart Flight Search",
      description: "Find the best flights with AI that considers climate, price, and stopover potential."
    },
    {
      icon: <Building className="h-8 w-8 text-earth-terracotta" />,
      title: "Coliving & Coworking",
      description: "Discover spaces with strong WiFi, community, and great amenities."
    },
    {
      icon: <Coffee className="h-8 w-8 text-earth-terracotta" />,
      title: "Local eSIM Options",
      description: "Get connected immediately with pre-vetted mobile data options."
    },
    {
      icon: <FileText className="h-8 w-8 text-earth-terracotta" />,
      title: "PDF Trip Planning",
      description: "Generate complete trip itineraries with a single click."
    }
  ];

  return (
    <section id="concierge" className="py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Smarter. Wander Freer.</h2>
          <p className="text-lg text-foreground/80 mb-6">Your AI-powered nomadic sidekick is here.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* AI Chat Interface Mockup */}
          <div className="rounded-2xl overflow-hidden border border-border">
            <div className="bg-secondary px-4 py-3 flex items-center border-b border-border">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="ml-3 text-sm font-medium text-foreground/70">Nomadic Concierge</div>
            </div>
            
            <div className="bg-background p-4 h-80 overflow-y-auto flex flex-col space-y-4">
              {/* Chat messages */}
              <div className="ml-auto max-w-xs bg-earth-terracotta/10 p-3 rounded-2xl rounded-tr-sm">
                <p className="text-sm">Help me plan a workation in Bali for next month.</p>
                <p className="text-xs text-foreground/50 mt-1 text-right">10:42 AM</p>
              </div>
              
              <div className="mr-auto max-w-xs bg-secondary p-3 rounded-2xl rounded-tl-sm">
                <p className="text-sm">
                  <span className="font-medium">Nomadic Concierge:</span> I'd love to help you plan your Bali workation! Here's what you need to know:
                </p>
                <p className="text-xs text-foreground/50 mt-1">10:42 AM</p>
              </div>
              
              <div className="mr-auto max-w-sm bg-secondary p-3 rounded-2xl rounded-tl-sm">
                <p className="text-sm">
                  <span className="font-medium">Nomadic Concierge:</span> First, you'll need a tourist visa which gives you 30 days in Indonesia. For internet, Canggu and Ubud have the most reliable connections with average speeds of 20-30 Mbps.
                </p>
                <p className="text-xs text-foreground/50 mt-1">10:43 AM</p>
              </div>
              
              <div className="mr-auto max-w-sm bg-secondary p-3 rounded-2xl rounded-tl-sm">
                <p className="text-sm font-medium">Would you like me to suggest some coworking spaces and accommodations?</p>
                <p className="text-xs text-foreground/50 mt-1">10:43 AM</p>
              </div>
              
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" size="sm" className="text-xs">Yes, please!</Button>
                <Button variant="outline" size="sm" className="text-xs">Just coworking</Button>
                <Button variant="outline" size="sm" className="text-xs">Just accommodation</Button>
              </div>
              
              <div className="h-6"></div>
            </div>
            
            {/* Chat input */}
            <div className="bg-secondary p-3 border-t border-border">
              <div className="flex items-center bg-background rounded-lg px-3 py-2 border border-border">
                <input
                  type="text"
                  placeholder="Ask your nomadic concierge..."
                  className="bg-transparent border-0 focus:outline-none flex-grow text-sm"
                  disabled
                />
                <button className="text-earth-terracotta ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Features Cards */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="feature-card">
                  <div className="flex flex-col items-start">
                    <div className="mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button
                onClick={handleClick}
                className={`bg-earth-terracotta hover:bg-earth-terracotta/90 text-white px-8 py-6 text-lg ${
                  isAnimating ? 'shimmer-button' : ''
                }`}
                disabled={isAnimating}
              >
                Try It Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NomadConciergeSection;
