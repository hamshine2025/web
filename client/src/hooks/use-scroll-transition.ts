import { useState, useEffect } from 'react';

export const useScrollTransition = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate time of day based on scroll progress
  const getTimeOfDay = () => {
    if (scrollProgress < 0.2) return 'sunrise';
    if (scrollProgress < 0.4) return 'morning';
    if (scrollProgress < 0.6) return 'afternoon';
    if (scrollProgress < 0.8) return 'sunset';
    return 'night';
  };

  // Calculate background gradient based on scroll progress
  const getBackgroundGradient = () => {
    const progress = scrollProgress;
    
    if (progress < 0.2) {
      // Sunrise: Pink/orange to light blue
      const intensity = progress / 0.2;
      return `linear-gradient(180deg, 
        hsl(${15 + intensity * 45}, ${80 - intensity * 30}%, ${85 - intensity * 15}%) 0%,
        hsl(${195 + intensity * 15}, ${60 + intensity * 20}%, ${90 - intensity * 10}%) 100%)`;
    } else if (progress < 0.4) {
      // Morning: Light blue to bright blue
      const intensity = (progress - 0.2) / 0.2;
      return `linear-gradient(180deg,
        hsl(${210 - intensity * 10}, ${80 + intensity * 10}%, ${80 - intensity * 20}%) 0%,
        hsl(${200 + intensity * 10}, ${70 + intensity * 20}%, ${85 - intensity * 25}%) 100%)`;
    } else if (progress < 0.6) {
      // Afternoon: Bright to warm
      const intensity = (progress - 0.4) / 0.2;
      return `linear-gradient(180deg,
        hsl(${200 + intensity * 20}, ${90 - intensity * 20}%, ${60 + intensity * 20}%) 0%,
        hsl(${180 + intensity * 30}, ${80 - intensity * 10}%, ${75 - intensity * 15}%) 100%)`;
    } else if (progress < 0.8) {
      // Sunset: Warm to orange/red
      const intensity = (progress - 0.6) / 0.2;
      return `linear-gradient(180deg,
        hsl(${30 - intensity * 15}, ${85 + intensity * 10}%, ${70 - intensity * 30}%) 0%,
        hsl(${15 + intensity * 15}, ${90 - intensity * 20}%, ${50 + intensity * 20}%) 100%)`;
    } else {
      // Night: Dark blue to black
      const intensity = (progress - 0.8) / 0.2;
      return `linear-gradient(180deg,
        hsl(${220 + intensity * 20}, ${30 - intensity * 20}%, ${15 - intensity * 10}%) 0%,
        hsl(${240 - intensity * 40}, ${20 - intensity * 15}%, ${8 - intensity * 6}%) 100%)`;
    }
  };

  // Calculate text color based on time of day
  const getTextColor = () => {
    const progress = scrollProgress;
    if (progress < 0.7) {
      return 'text-gray-800'; // Dark text for light backgrounds
    } else {
      return 'text-white'; // Light text for dark backgrounds
    }
  };

  // Calculate overlay opacity for content readability
  const getOverlayOpacity = () => {
    if (scrollProgress > 0.7) {
      return Math.min((scrollProgress - 0.7) / 0.3 * 0.3, 0.3);
    }
    return 0;
  };

  // Get celestial elements based on time of day
  const getCelestialElements = () => {
    const progress = scrollProgress;
    const elements = [];
    
    if (progress < 0.3) {
      // Sunrise/Morning - Sun
      elements.push({
        type: 'sun',
        opacity: Math.max(0, 1 - progress * 2),
        position: { right: '10%', top: '10%' }
      });
    } else if (progress > 0.8) {
      // Night - Stars and Moon
      elements.push({
        type: 'moon',
        opacity: Math.min(1, (progress - 0.8) * 5),
        position: { right: '15%', top: '8%' }
      });
      
      // Add stars
      for (let i = 0; i < 5; i++) {
        elements.push({
          type: 'star',
          opacity: Math.min(1, (progress - 0.8) * 5),
          position: { 
            right: `${20 + i * 15}%`, 
            top: `${15 + (i % 2) * 10}%` 
          }
        });
      }
    }
    
    return elements;
  };

  return {
    scrollProgress,
    timeOfDay: getTimeOfDay(),
    backgroundGradient: getBackgroundGradient(),
    textColor: getTextColor(),
    overlayOpacity: getOverlayOpacity(),
    celestialElements: getCelestialElements(),
  };
};