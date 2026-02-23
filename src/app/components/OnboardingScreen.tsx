import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, TrendingUp, Shield, Wallet } from 'lucide-react';
import { Button } from './ui/button';

const onboardingSlides = [
  {
    icon: Sparkles,
    title: 'Build Credit Early',
    description: 'Help your kids build a strong credit foundation from day one with smart spending habits',
    color: 'text-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress Together',
    description: 'Watch their credit score grow as they complete tasks and learn financial responsibility',
    color: 'text-green-500',
  },
  {
    icon: Shield,
    title: 'Safe & Controlled',
    description: 'Set spending limits, block categories, and approve every transaction from your parent dashboard',
    color: 'text-blue-500',
  },
  {
    icon: Wallet,
    title: 'Earn & Learn',
    description: 'Kids earn XP and rewards by completing chores and learning about money management',
    color: 'text-orange-500',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleComplete = useCallback(() => {
    onComplete();
    navigate('/parent');
  }, [onComplete, navigate]);

  const handleNext = useCallback(() => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleComplete();
    }
  }, [currentSlide, handleComplete]);

  const slide = onboardingSlides[currentSlide];
  const Icon = slide.icon;
  const isLastSlide = currentSlide === onboardingSlides.length - 1;

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Skip Button */}
      <div className="flex justify-end p-6">
        <button
          onClick={handleComplete}
          className="text-slate-500 font-medium hover:text-slate-700 transition-colors px-3 py-1 rounded-lg focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
          aria-label="Skip onboarding and go to dashboard"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        <div
          className={`w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center mb-12 ${slide.color} transition-all duration-500`}
          aria-hidden="true"
        >
          <Icon size={64} strokeWidth={1.5} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 text-center mb-4">
          {slide.title}
        </h1>

        <p className="text-lg text-slate-600 text-center leading-relaxed max-w-sm">
          {slide.description}
        </p>
      </main>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mb-8" role="tablist" aria-label="Onboarding progress">
        {onboardingSlides.map((s, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={index === currentSlide}
            aria-label={`Slide ${index + 1} of ${onboardingSlides.length}: ${s.title}`}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2 ${
              index === currentSlide
                ? 'w-8 bg-blue-600'
                : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="px-8 pb-10">
        <Button
          onClick={handleNext}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-2xl transition-all active:scale-[0.98]"
        >
          {isLastSlide ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
