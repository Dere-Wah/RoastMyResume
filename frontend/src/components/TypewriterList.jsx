import React, { Component } from 'react';
import Typewriter from './Typewriter';

class TypewriterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedElements: [], // Tracks which elements are currently displayed
    };
    this.timeoutIds = []; // To store timeouts for cleanup if necessary
  }

  componentDidMount() {
    const { current_cv, current_roast, interval } = this.props;
    this.renderTypewriters(current_cv, current_roast, interval);
  }

  componentWillUnmount() {
    // Clear all timeouts on component unmount
    this.timeoutIds.forEach((id) => clearTimeout(id));
  }

 

  renderTypewriters(current_cv, current_roast, interval) {
      let accumulatedDelay = 0;
      console.log(current_cv);
      console.log(current_roast);
      Object.values(current_roast).forEach((roast_line, index) => {
        const current_cv_line = current_cv[`${index+1}`];
        const new_cv = {"text": current_cv_line, "is_cv": true};      
      const timeoutId = setTimeout(() => {
        this.setState((prevState) => ({
          displayedElements: [...prevState.displayedElements, new_cv],
        }));
      }, accumulatedDelay);
      accumulatedDelay += new_cv.text.length * 40 + interval;
      this.timeoutIds.push(timeoutId);

      const new_roast = {"text": roast_line, "is_cv": false};      
    const timeoutId2 = setTimeout(() => {
      this.setState((prevState) => ({
        displayedElements: [...prevState.displayedElements, new_roast],
      }));
    }, accumulatedDelay);
    accumulatedDelay += new_roast.text.length * 40 + interval;
    this.timeoutIds.push(timeoutId2);
    });
  }

  render() {
    const { displayedElements } = this.state;
    console.log(displayedElements);
    return (
      <div className="flex flex-col items-center text-black w-full gap-4 py-4 overflow-x-hidden overflow-y-scroll">
        {displayedElements.map((text, idx) => (
            <div key={idx} className="max-w-[80%] ">
                <div className="">
                    <Typewriter  text={text.text} color={text.is_cv && "bg-green-200" || !text.is_cv && "bg-white"} typingSpeed={40 } client:load />
                </div>
            </div>

        ))}
      </div>
    );
  }
}

export default TypewriterList;
