
import { useState, useEffect, useRef } from 'react';
import Globe from './Globe';
import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, MapPin } from 'lucide-react';

const translations = [
  { text: "Hecho para quienes son alérgicos a las oficinas", language: "Spanish" },
  { text: "Feito para quem é alérgico a escritórios", language: "Portuguese" },
  { text: "Fait pour ceux qui sont allergiques aux bureaux", language: "French" },
  { text: "オフィスにアレルギーがある人のために作られた", language: "Japanese" },
  { text: "Für Büroallergiker gemacht", language: "German" },
  { text: "Створено для тих, хто має алергію на офіси", language: "Ukrainian" }
];

const HeroSection = () => {
  // Typewriter effect state
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "Made for those allergic to cubicles.";
  
  // Translation state
  const [translationIndex, setTranslationIndex] = useState(0);
  const [currentTranslation, setCurrentTranslation] = useState(translations[0]);
  const [isTranslationVisible, setIsTranslationVisible] = useState(true);
  
  // Animation state
  const [floatingIcons, setFloatingIcons] = useState<{id: number, icon: string, x: number, y: number, speed: number}[]>([]);

  // Refs for scroll
  const nomadConciergeRef = useRef<HTMLDivElement | null>(null);

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Translation rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTranslationVisible(false);
      
      setTimeout(() => {
        setTranslationIndex((prevIndex) => (prevIndex + 1) % translations.length);
        setCurrentTranslation(translations[(translationIndex + 1) % translations.length]);
        setIsTranslationVisible(true);
      }, 500);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [translationIndex]);
  
  // Generate floating icons
  useEffect(() => {
    const icons = ["✈️", "🌍", "🧭", "🏝️", "💼", "🌴", "☕", "💻"];
    const newFloatingIcons = Array.from({length: 8}, (_, i) => ({
      id: i,
      icon: icons[i],
      x: Math.random() * 90 + 5,  // position between 5-95% of container width
      y: Math.random() * 70 + 15, // position between 15-85% of container height
      speed: 0.5 + Math.random() * 2 // random speed
    }));
    
    setFloatingIcons(newFloatingIcons);
  }, []);

  // Handle scroll to Nomad Concierge section
  const handleScrollToNomadConcierge = () => {
    const conciergeSection = document.getElementById('concierge');
    if (conciergeSection) {
      conciergeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Button click ripple effect
  const [ripples, setRipples] = useState<{id: number, x: number, y: number}[]>([]);
  const nextId = useRef(0);
  
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const rippleX = e.clientX - buttonRect.left;
    const rippleY = e.clientY - buttonRect.top;
    
    const newRipple = {
      id: nextId.current,
      x: rippleX,
      y: rippleY
    };
    
    nextId.current += 1;
    setRipples([...ripples, newRipple]);
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(current => current.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
    
    handleScrollToNomadConcierge();
  };

  return (
    <section className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
      {/* Floating background icons */}
      {floatingIcons.map((item) => (
        <div 
          key={item.id}
          className="absolute text-xl opacity-20 pointer-events-none"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animation: `float ${3 + item.speed}s ease-in-out infinite`,
            animationDelay: `${item.id * 0.5}s`
          }}
        >
          {item.icon}
        </div>
      ))}
      
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="relative">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
                {displayText}
                <span className="inline-block w-1 h-8 bg-accent animate-type-cursor ml-1"></span>
              </h1>
              <span className="absolute -top-4 -right-4 text-xl animate-pulse-glow">✨</span>
            </div>
            
            <div className="h-16 relative">
              <p 
                className={`text-lg md:text-xl text-foreground/70 transition-opacity duration-500 ${isTranslationVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                {currentTranslation.text}
                <span className="text-sm ml-2 text-foreground/50">[{currentTranslation.language}]</span>
              </p>
              
              {/* Subtle underline animation */}
              <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-earth-terracotta/30 animate-pulse-glow"></div>
            </div>
            
            <div className="relative">
              <Button 
                className="glassmorphism bg-gradient-to-r from-earth-terracotta to-earth-clay text-white px-6 py-6 text-lg font-medium overflow-hidden group"
                onClick={handleButtonClick}
              >
                <span className="relative z-10 flex items-center">
                  Start My Trail
                  <ArrowDown className="ml-2 h-5 w-5 group-hover:animate-bounce" />
                </span>
                
                <span className="absolute inset-0 bg-gradient-to-r from-earth-terracotta to-earth-clay opacity-90 group-hover:opacity-100 transition-opacity"></span>
                
                {ripples.map(ripple => (
                  <span
                    key={ripple.id}
                    className="absolute rounded-full bg-white/30 animate-ripple"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: '10px',
                      height: '10px',
                      marginLeft: '-5px',
                      marginTop: '-5px'
                    }}
                  />
                ))}
              </Button>
              
              {/* Floating decoration */}
              <div className="absolute -right-8 -bottom-8 text-earth-terracotta/20 animate-float">
                <MapPin size={32} />
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="hidden lg:block absolute -left-20 top-1/2 transform -rotate-12">
              <div className="relative">
                <div className="rounded-full bg-earth-sand/10 backdrop-blur-sm border border-earth-sand/20 px-4 py-1.5 text-xs font-medium flex items-center space-x-1 animate-float">
                  <Sparkles className="h-3 w-3 text-earth-terracotta" />
                  <span>New Experience</span>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-earth-sand/20 animate-spin-slow"></div>
              </div>
            </div>
          </div>
          
          {/* Right column - Globe */}
          <div className="order-first md:order-last relative">
            <div className="p-4 relative">
              <Globe />
              
              {/* Decorative pings on the globe */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3">
                <span className="absolute w-full h-full rounded-full bg-earth-terracotta opacity-75 animate-ping"></span>
                <span className="absolute w-full h-full rounded-full bg-earth-terracotta"></span>
              </div>
              
              <div className="absolute bottom-1/3 right-1/3 w-3 h-3">
                <span className="absolute w-full h-full rounded-full bg-earth-clay opacity-75 animate-ping" style={{ animationDelay: '1s' }}></span>
                <span className="absolute w-full h-full rounded-full bg-earth-clay"></span>
              </div>
            </div>
            
            {/* Floating label */}
            <div className="absolute -right-6 top-1/2 transform translate-y-1/2 rotate-12 bg-earth-forest/10 backdrop-blur-sm border border-earth-forest/20 rounded-lg px-3 py-1.5 text-xs animate-float">
              14,500+ nomads
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-earth-terracotta/10 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-earth-forest/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-earth-sand/5 to-transparent pointer-events-none"></div>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
