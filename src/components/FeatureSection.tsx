
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Feature = {
  emoji: string;
  name: string;
  description: string;
  tag: string;
};

const FeatureSection = () => {
  const { toast } = useToast();
  const [notificationFeatures, setNotificationFeatures] = useState<Set<string>>(new Set());
  
  const features: Feature[] = [
    { 
      emoji: "🧾", 
      name: "Budget Planner", 
      description: "Track, split, and plan your nomad budget", 
      tag: "Nomadic Ledger" 
    },
    { 
      emoji: "💼", 
      name: "Remote Jobs", 
      description: "Curated global work listings", 
      tag: "NomadWork" 
    },
    { 
      emoji: "☕", 
      name: "Nomad Match", 
      description: "See who's nearby, connect IRL", 
      tag: "NomadCircle" 
    },
    { 
      emoji: "🌈", 
      name: "Cowork Vibes", 
      description: "Real-time mood data from coworking spots", 
      tag: "NomadPulse" 
    },
    { 
      emoji: "🛂", 
      name: "Visa Alerts", 
      description: "Stay ahead of border changes", 
      tag: "NomadEntry" 
    },
    { 
      emoji: "🚌", 
      name: "Transport Hack", 
      description: "Route rail/bus between nomad cities", 
      tag: "NomadRoute" 
    },
    { 
      emoji: "🪙", 
      name: "Rewards & Gamification", 
      description: "Earn for exploring & sharing", 
      tag: "Nomadic Coins" 
    }
  ];
  
  const handleNotify = (featureName: string) => {
    if (notificationFeatures.has(featureName)) {
      toast({
        title: "Already on the list!",
        description: `You'll be notified when ${featureName} launches.`,
        variant: "default"
      });
      return;
    }
    
    const newNotifications = new Set(notificationFeatures);
    newNotifications.add(featureName);
    setNotificationFeatures(newNotifications);
    
    toast({
      title: "Notification Set!",
      description: `You'll be notified when ${featureName} launches.`,
      variant: "default"
    });
  };

  return (
    <section id="features" className="py-20 relative">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-6">
            <div className="text-6xl">☕</div>
            {/* Coffee steam animation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full">
              <div className="steam" style={{ animationDelay: '0s', left: '-5px' }}></div>
              <div className="steam" style={{ animationDelay: '0.3s', left: '5px' }}></div>
              <div className="steam" style={{ animationDelay: '0.6s', left: '0px' }}></div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What's Brewing</h2>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Our team is working on these exciting features. Sign up to be notified when they launch!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.name} className="bg-secondary/50 backdrop-blur-sm hover:bg-secondary/70 transition-colors border border-border/50 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl" role="img" aria-label={feature.name}>
                    {feature.emoji}
                  </span>
                  <span className="text-xs bg-background/50 px-2 py-1 rounded-full">
                    {feature.tag}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{feature.name}</h3>
                <p className="text-sm text-foreground/70 mb-6">{feature.description}</p>
                
                <div className="mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-dashed"
                    onClick={() => handleNotify(feature.name)}
                  >
                    {notificationFeatures.has(feature.name) ? "Notify Added!" : "Notify Me"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background/5 to-transparent -z-10"></div>
    </section>
  );
};

export default FeatureSection;
