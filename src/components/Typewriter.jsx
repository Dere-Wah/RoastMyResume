import React, { useState, useEffect } from "react";

const Typewriter = ({ text, typingSpeed = 100, color = "bg-white", is_cv = false}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const typingInterval = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [index, text, typingSpeed]);

  useEffect(() => {
    const cursorBlinkId = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorBlinkId);
  }, []);

  return (
    
    <div className={`${is_cv && "color-green-200"} ${color} shadow-sm rounded-md px-4 text-lg whitespace-pre-wrap `}>
      <div style={{ fontFamily: "monospace"}}>
        {displayedText}
        {cursorVisible ? "_" : " "}
      </div>
    </div>
  );
};

export default Typewriter;
