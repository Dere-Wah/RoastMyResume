import React, { Component, createRef } from 'react';
import Typewriter from './Typewriter';

class TypewriterList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayedElements: [], // Tracks which elements are currently displayed
    };
    this.timeoutIds = []; // To store timeouts for cleanup if necessary
    this.listEndRef = createRef(); // Reference for the last element
  }

  componentDidMount() {
    const { resume, interval } = this.props;
    this.renderTypewriters(resume, interval);
  }

  componentDidUpdate() {
    // Scroll to the bottom whenever a new element is added
    if (this.listEndRef.current) {
      this.listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  componentWillUnmount() {
    // Clear all timeouts on component unmount
    this.timeoutIds.forEach((id) => clearTimeout(id));
  }

  calculateTimeouts(text, typing_speed) {
    return text.length * typing_speed;
  }

  enqueueElement(accumulatedDelay, text, type, typing_speed) {
    const timeoutId = setTimeout(() => {
      const current = { text: text, type: type, typing_speed: typing_speed };

      this.setState((prevState) => ({
        displayedElements: [...prevState.displayedElements, current],
      }));
    }, accumulatedDelay);
    accumulatedDelay += this.calculateTimeouts(text, typing_speed);
    this.timeoutIds.push(timeoutId);
    return accumulatedDelay;
  }

  renderTypewriters(resume, interval) {
    let accumulatedDelay = 2000;
    Object.values(resume.chunks).forEach((element, index) => {
      console.log(element);
      accumulatedDelay = this.enqueueElement(accumulatedDelay, element.summary, 'summary', 25) + interval;
      accumulatedDelay = this.enqueueElement(accumulatedDelay, element.roast, 'roast', 60) + interval * 2;
      accumulatedDelay = this.enqueueElement(
        accumulatedDelay,
        element.short_impactful_ironic_insult,
        'insult',
        150
      ) + interval * 2;
    });
  }

  render() {
    const { displayedElements } = this.state;
    return (
      <div className="flex flex-col items-center text-black w-full gap-4 py-4 h-80% overflow-auto">
        {displayedElements.map((text, idx) => (
          <div
            key={idx}
            className={`max-w-[80%] ${
              text.type === 'insult' ? 'text-4xl' : 'text-xl'
            }`}
          >
            <Typewriter
              text={text.text}
              color={text.type === 'summary' ? 'bg-green-200' : 'bg-white'}
              typingSpeed={text.typing_speed}
              padding={true}
              client:load
            />
          </div>
        ))}
        {/* Ref for scrolling */}
        <div ref={this.listEndRef} />
      </div>
    );
  }
}

export default TypewriterList;
