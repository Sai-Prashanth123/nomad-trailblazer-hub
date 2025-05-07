
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { 
  Plane, FileText, Users, Building, Coffee, Search,
  Sparkles, Globe, Map, MessageSquare, ArrowRight
} from 'lucide-react';

const NomadConciergeSection = () => {
  const { toast } = useToast();
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);
  const [progressValue, setProgressValue] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // For animated number counters
  const [nomadCount, setNomadCount] = useState(0);
  const [countryCount, setCountryCount] = useState(0);
  
  useEffect(() => {
    // Animate the counters when component mounts
    const nomadCountTarget = 14500;
    const countryCountTarget = 42;
    const duration = 2000; // ms
    const interval = 50; // ms
    
    const nomadStep = nomadCountTarget / (duration / interval);
    const countryStep = countryCountTarget / (duration / interval);
    
    const timer = setInterval(() => {
      setNomadCount((prev) => {
        const next = Math.min(prev + nomadStep, nomadCountTarget);
        return next >= nomadCountTarget ? nomadCountTarget : next;
      });
      
      setCountryCount((prev) => {
        const next = Math.min(prev + countryStep, countryCountTarget);
        return next >= countryCountTarget ? countryCountTarget : next;
      });
    }, interval);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleClick = () => {
    setIsAnimating(true);
    setProgressValue(0);
    
    // Start progress animation
    const interval = setInterval(() => {
      setProgressValue(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
    
    // Show toast with vibrant background
    toast({
      title: "Coming Soon!",
      description: "The Nomadic Concierge is currently in development.",
      variant: "default",
      className: "bg-gradient-to-r from-earth-terracotta to-earth-clay text-white"
    });
    
    // Trigger confetti effect
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
      setProgressValue(0);
    }, 2000);
  };
  
  // Feature cards data
  const features = [
    {
      icon: <Plane className="h-8 w-8 text-earth-terracotta" />,
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
    <section id="concierge" className="py-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-earth-sand/30 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-earth-clay/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#C66E4E', '#E6D2B5', '#BEB6A6', '#8A8F7F'][Math.floor(Math.random() * 4)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `confetti ${1 + Math.random()}s ease-out forwards`,
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}
      
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block relative mb-6">
            <span className="text-4xl">🧭</span>
            <span className="absolute -top-2 -right-2 flex h-5 w-5">
              <span className="animate-ping absolute h-full w-full rounded-full bg-earth-terracotta/50"></span>
              <span className="relative rounded-full h-5 w-5 bg-earth-terracotta flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-white" />
              </span>
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Plan Smarter. <span className="text-earth-terracotta">Wander Freer.</span></h2>
          <p className="text-lg text-foreground/80 mb-6">Your AI-powered nomadic sidekick is here.</p>
          
          {/* Animated stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8 mb-10">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-earth-terracotta">
                {Math.floor(nomadCount).toLocaleString()}+
              </div>
              <div className="text-sm text-foreground/70">Nomads Assisted</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-earth-terracotta">
                {Math.floor(countryCount)}+
              </div>
              <div className="text-sm text-foreground/70">Countries Covered</div>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* AI Chat Interface Mockup with enhanced styling */}
          <div className="rounded-2xl overflow-hidden border border-border shadow-lg transform transition-all hover:scale-105 duration-300">
            <div className="bg-secondary px-4 py-3 flex items-center border-b border-border">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <div className="ml-3 text-sm font-medium text-foreground/70">Nomadic Concierge</div>
            </div>
            
            <div className="bg-background p-4 h-80 overflow-y-auto flex flex-col space-y-4">
              {/* Chat messages with animated entries */}
              <div className="ml-auto max-w-xs bg-earth-terracotta/10 p-3 rounded-2xl rounded-tr-sm animate-fade-in">
                <p className="text-sm">Help me plan a workation in Bali for next month.</p>
                <p className="text-xs text-foreground/50 mt-1 text-right">10:42 AM</p>
              </div>
              
              <div className="mr-auto max-w-xs bg-secondary p-3 rounded-2xl rounded-tl-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <p className="text-sm">
                  <span className="font-medium">Nomadic Concierge:</span> I'd love to help you plan your Bali workation! Here's what you need to know:
                </p>
                <p className="text-xs text-foreground/50 mt-1">10:42 AM</p>
              </div>
              
              <div className="mr-auto max-w-sm bg-secondary p-3 rounded-2xl rounded-tl-sm animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <p className="text-sm">
                  <span className="font-medium">Nomadic Concierge:</span> First, you'll need a tourist visa which gives you 30 days in Indonesia. For internet, Canggu and Ubud have the most reliable connections with average speeds of 20-30 Mbps.
                </p>
                <p className="text-xs text-foreground/50 mt-1">10:43 AM</p>
              </div>
              
              <div className="mr-auto max-w-sm bg-secondary p-3 rounded-2xl rounded-tl-sm animate-fade-in" style={{ animationDelay: '0.9s' }}>
                <p className="text-sm font-medium">Would you like me to suggest some coworking spaces and accommodations?</p>
                <p className="text-xs text-foreground/50 mt-1">10:43 AM</p>
              </div>
              
              <div className="flex space-x-2 mt-2 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <Button variant="outline" size="sm" className="text-xs bg-background/80 hover:bg-earth-terracotta hover:text-white transition-colors">Yes, please!</Button>
                <Button variant="outline" size="sm" className="text-xs bg-background/80 hover:bg-earth-terracotta hover:text-white transition-colors">Just coworking</Button>
                <Button variant="outline" size="sm" className="text-xs bg-background/80 hover:bg-earth-terracotta hover:text-white transition-colors">Just accommodation</Button>
              </div>
              
              <div className="h-6"></div>
            </div>
            
            {/* Chat input with animated cursor */}
            <div className="bg-secondary p-3 border-t border-border">
              <div className="flex items-center bg-background rounded-lg px-3 py-2 border border-border">
                <input
                  type="text"
                  placeholder="Ask your nomadic concierge..."
                  className="bg-transparent border-0 focus:outline-none flex-grow text-sm"
                  disabled
                />
                <button className="text-earth-terracotta ml-2 hover:text-earth-clay transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Features Cards with enhanced interactivity */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className={`feature-card group transition-all duration-300 hover:-translate-y-2 cursor-pointer ${selectedFeature === index ? 'border-earth-terracotta ring-2 ring-earth-terracotta/50' : 'border-border/50'}`}
                  onClick={() => setSelectedFeature(index)}
                >
                  <div className="flex flex-col items-start p-6">
                    <div className="mb-3 transform transition-transform duration-300 group-hover:rotate-12">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.description}</p>
                    
                    {/* Expandable content when selected */}
                    {selectedFeature === index && (
                      <div className="mt-4 pt-4 border-t border-border/30 w-full animate-fade-in">
                        <RadioGroup defaultValue="option-one" className="mb-3">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id={`option-one-${index}`} />
                            <label htmlFor={`option-one-${index}`} className="text-xs">Basic</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id={`option-two-${index}`} />
                            <label htmlFor={`option-two-${index}`} className="text-xs">Premium</label>
                          </div>
                        </RadioGroup>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full text-xs border-dashed border-earth-terracotta/60 hover:bg-earth-terracotta/10"
                        >
                          Learn More
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="flex flex-col items-center mt-8">
              {progressValue > 0 && (
                <div className="w-64 mb-4">
                  <Progress value={progressValue} className="h-2 bg-earth-sand/30" />
                </div>
              )}
              
              <Button
                onClick={handleClick}
                className={`bg-earth-terracotta hover:bg-earth-terracotta/90 text-white px-8 py-6 text-lg relative overflow-hidden group ${
                  isAnimating ? 'shimmer-button' : ''
                }`}
                disabled={isAnimating}
              >
                <span className="relative z-10 flex items-center">
                  Try It Now
                  <Globe className="ml-2 h-5 w-5 transition-transform group-hover:rotate-180" />
                </span>
                
                {/* Bubble animation on hover */}
                <span className="absolute inset-0 overflow-hidden rounded-md">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className="absolute w-12 h-12 bg-white/10 rounded-full pointer-events-none"
                      style={{
                        left: `${20 * i}%`,
                        bottom: '-100%',
                        transition: 'transform 0.6s ease',
                        transitionDelay: `${0.1 * i}s`,
                        transform: 'translateY(0)',
                      }}
                    />
                  ))}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes confetti {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(${Math.random() > 0.5 ? '-' : ''}${20 + Math.random() * 30}px, -100px) rotate(${Math.random() * 360}deg); opacity: 0; }
        }
        
        .feature-card:hover {
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
        }
        
        .group:hover .bg-white\/10 {
          transform: translateY(-120px);
        }
      `}</style>
    </section>
  );
};

export default NomadConciergeSection;
