import React, { useState, useEffect } from 'react';
import Typewriter from './Typewriter';

const TextSwitcher = ({ texts, interval, typing_speed }) => {
  const [currentTexts, setCurrentTexts] = useState([]);
  const [availableTexts, setAvailableTexts] = useState([...texts]);

  useEffect(() => {
    const displayNextText = () => {
      if (availableTexts.length > 0) {
        // Select a random index from the available texts
        const randomIndex = Math.floor(Math.random() * availableTexts.length);
        const selectedText = availableTexts[randomIndex];

        // Add the selected text to the currentTexts
        setCurrentTexts((prev) => [...prev, selectedText]);

        // Remove the selected text from availableTexts
        setAvailableTexts((prev) =>
          prev.filter((_, index) => index !== randomIndex)
        );

        // Calculate the delay for the next text
        const displayTime = selectedText.length * typing_speed + interval;

        // Schedule the next text to be added after the display time
        setTimeout(() => {
          displayNextText();
        }, displayTime);
      }
    };

    if (availableTexts.length > 0) {
      displayNextText(); // Start the initial text display
    }
  }, [texts, interval, typing_speed]);

  return (
    <div>
      {currentTexts.map((text, index) => (
        <Typewriter key={index} text={text} background={false} typingSpeed={typing_speed} />
      ))}
    </div>
  );
};

export default TextSwitcher;
