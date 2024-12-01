import React, { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

const Typewriter = ({ text, typingSpeed = 100, color = "bg-white", is_cv = false, background = true, padding = false}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [finished, setFinished] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index == text.length){
      console.log("finished writing: " + text);
      setFinished(true);
    }
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
    <div className={`${is_cv && "color-green-200"} ${background && color} ${background && "shadow-sm rounded-md"} whitespace-pre-wrap ${padding && "px-4"}`}>
      <div className="flex flex-row" style={{ fontFamily: "monospace"}}>
        <ReactMarkdown>{displayedText + (finished && "" || (!finished && cursorVisible) ? "_" : "  ")}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Typewriter;
