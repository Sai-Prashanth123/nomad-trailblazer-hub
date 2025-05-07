
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CommunitySection = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to submit feedback.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Feedback Form Sent!",
        description: "Thank you for helping shape the future of NomadTrails.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="community" className="py-20 bg-secondary/30">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 bg-background backdrop-blur-md shadow-lg border border-border/70">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Voice = Our Roadmap</h2>
              <p className="text-lg text-foreground/70">
                We're building this trail together. Help us decide what comes next.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="email" className="block text-sm font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md border border-border bg-background/50"
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="feedback" className="block text-sm font-medium">
                  What features would you like to see?
                </label>
                <textarea
                  id="feedback"
                  rows={4}
                  placeholder="I'd love to see..."
                  className="w-full p-3 rounded-md border border-border bg-background/50 resize-none"
                ></textarea>
              </div>
              
              <div className="pt-2">
                <Button
                  type="submit"
                  className={`w-full bg-earth-terracotta hover:bg-earth-terracotta/90 text-white py-6 ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Give Feedback'}
                </Button>
              </div>
            </form>
            
            <div className="mt-8 text-center text-sm text-foreground/60">
              <p>Your feedback directly impacts our development priorities.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
