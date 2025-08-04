import { useEffect, useState } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

const CinematicIntro = ({ onComplete }: CinematicIntroProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const steps = [
      { duration: 2000, text: "CINEMATIC" },
      { duration: 2000, text: "EXPERIENCE" },
      { duration: 1500, text: "PRESENTS" },
      { duration: 3000, text: "CINEVAULT" }
    ];

    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 1000);
      }
    }, steps[currentStep]?.duration || 2000);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        <div className="relative">
          {/* Main text */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-wider animate-pulse">
            {currentStep === 0 && "CINEMATIC"}
            {currentStep === 1 && "EXPERIENCE"}
            {currentStep === 2 && "PRESENTS"}
            {currentStep === 3 && "CINEVAULT"}
          </h1>
          
          {/* Subtitle for final step */}
          {currentStep === 3 && (
            <p className="text-xl text-gray-400 mt-4 animate-fade-in">
              Premium Film Experience
            </p>
          )}
          
          {/* Background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-pulse" />
            
            {/* Simple floating elements */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CinematicIntro; 