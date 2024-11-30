import React, { useState, useEffect } from "react";

const Typewriter = ({ text, typingSpeed = 100 }) => {
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
    <div className="bg-white w-min shadow-md rounded-md px-4">
      <div style={{ fontFamily: "monospace", whiteSpace: "pre" }}>
        {displayedText}
        {cursorVisible ? "_" : " "}
      </div>
    </div>
  );
};

export default Typewriter;
