import React, { useState, useEffect, useRef } from 'react';
import Typewriter from './Typewriter';
import CustomButton from './CustomButton';
import Suggestion from "./Suggestion";

const TypewriterList = ({ resume, interval }) => {
  const [displayedElements, setDisplayedElements] = useState([]);
  const [finished, setFinished] = useState(false);
  const listEndRef = useRef(null);
  const timeoutIds = useRef([]);

  useEffect(() => {
    renderTypewriters(resume, interval);

    return () => {
      // Cleanup all timeouts on unmount
      timeoutIds.current.forEach((id) => clearTimeout(id));
    };
  }, [resume, interval]);

  useEffect(() => {
    // Scroll to the bottom whenever a new element is added
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayedElements]);

  const calculateTimeouts = (text, typingSpeed) => {
    return text.length * typingSpeed;
  };

  const enqueueElement = (accumulatedDelay, text, type, typingSpeed) => {
    const timeoutId = setTimeout(() => {
      setDisplayedElements((prev) => [
        ...prev,
        { text, type, typingSpeed },
      ]);
    }, accumulatedDelay);

    accumulatedDelay += calculateTimeouts(text, typingSpeed);
    timeoutIds.current.push(timeoutId);
    return accumulatedDelay;
  };

  const renderTypewriters = (resume, interval) => {
    let accumulatedDelay = 2000;

    Object.values(resume.chunks).forEach((element) => {
      accumulatedDelay = enqueueElement(accumulatedDelay, element.a_quote_from_the_cv_section_the_roast_is_about, 'summary', 25) + interval;
      accumulatedDelay = enqueueElement(accumulatedDelay, element.roast, 'roast', 60) + interval * 2;
      accumulatedDelay = enqueueElement(
        accumulatedDelay,
        element.short_impactful_ironic_insult,
        'insult',
        150
      ) + 100;
      accumulatedDelay = enqueueElement(accumulatedDelay, element.suggestion, 'suggestion', 10) + interval * 2;
    });

    accumulatedDelay = enqueueElement(accumulatedDelay, resume.final_short_overall_consideration, "roast", 60) + interval;
    accumulatedDelay = enqueueElement(accumulatedDelay, resume.one_big_company_that_could_hire_this_profile_and_reason, "insult", 60) + interval*2;

    accumulatedDelay += 2000;
    const timeout = setTimeout(() => {
      setFinished(true);
    }, accumulatedDelay);

    timeoutIds.current.push(timeout);
  };

  return (
    <div className="flex flex-col items-center text-black w-full gap-4 py-4 h-80% overflow-auto">
      {displayedElements.map((text, idx) => (
        <div
          key={idx}
          className={`max-w-[80%] ${
            text.type === 'insult' ? 'text-4xl' : 'text-xl'
          }`}
        >
          {text.type == "suggestion" &&
          <Suggestion text={text.text} />
          }
          {text.type != "suggestion" && 
          <Typewriter
            text={text.text}
            color={text.type === 'summary' ? 'bg-green-200' : 'bg-white'}
            typingSpeed={text.typingSpeed}
            padding={true}
            client:load
          />
          }
        </div>
      ))}
      {/* Ref for scrolling */}
      <div ref={listEndRef} className="h-[20px]"/>
      {finished && (
        <div className="h-1/2 w-full">
          <CustomButton execute={() => console.log('whew')}>
            Test 123
          </CustomButton>
        </div>
      )}
    </div>
  );
};

export default TypewriterList;
