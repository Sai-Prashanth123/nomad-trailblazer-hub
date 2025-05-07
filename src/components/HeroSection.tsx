
import { useState, useEffect, useRef } from 'react';
import Globe from './Globe';
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

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

  // Handle scroll to Nomadic Concierge section
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
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col justify-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
              {displayText}
              <span className="inline-block w-1 h-8 bg-accent animate-type-cursor ml-1"></span>
            </h1>
            
            <div className="h-16">
              <p 
                className={`text-lg md:text-xl text-foreground/70 transition-opacity duration-500 ${isTranslationVisible ? 'opacity-100' : 'opacity-0'}`}
              >
                {currentTranslation.text}
                <span className="text-sm ml-2 text-foreground/50">[{currentTranslation.language}]</span>
              </p>
            </div>
            
            <div className="relative">
              <Button 
                className="glassmorphism bg-earth-terracotta/90 hover:bg-earth-terracotta text-white px-6 py-6 text-lg font-medium overflow-hidden"
                onClick={handleButtonClick}
              >
                Start My Trail
                <ArrowDown className="ml-2 h-5 w-5" />
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
            </div>
          </div>
          
          {/* Right column - Globe */}
          <div className="order-first md:order-last">
            <div className="p-4">
              <Globe />
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-earth-terracotta/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-earth-forest/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
