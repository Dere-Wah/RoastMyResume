import React, { useState, useEffect } from "react";

const Typewriter = ({ text, typingSpeed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < text.length-1) {
        setDisplayedText((prev) => prev + text[index]);
        console.log(text[index])
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, typingSpeed]);

  useEffect(() => {
    const cursorBlinkId = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorBlinkId);
  }, []);

  return (
    <div style={{ fontFamily: "monospace", whiteSpace: "pre" }}>
      {displayedText}
      {cursorVisible ? "_" : " "}
    </div>
  );
};

export default Typewriter;
