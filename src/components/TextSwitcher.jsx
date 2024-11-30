import React, { useState, useEffect } from 'react';
import Typewriter from './Typewriter';

const TextSwitcher = ({ texts, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const switchText = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(switchText); // Cleanup the interval on component unmount
  }, [texts, interval]);

  return (
    <div className="w-full">
      <div className="w-full text-center text-black/40 text-4xl font-mono">{texts[currentIndex]}</div>
    </div>
  );
};


export default TextSwitcher;
