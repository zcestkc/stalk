'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay: number;
  infinite: boolean;
}

export const Typewriter = ({ text, delay, infinite }: TypewriterProps) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isPaused) return;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      // Pause at the end before looping
      setIsPaused(true);
      timeout = setTimeout(() => {
        setCurrentText('');
        setCurrentIndex(0);
        setIsPaused(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <span>&nbsp;{currentText}</span>;
};
