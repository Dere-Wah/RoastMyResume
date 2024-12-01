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
	const { resume, interval } = this.props;
	console.log("pog");
	this.renderTypewriters(resume, interval);
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
		const current = {text: text, type: type, typing_speed: typing_speed}

		this.setState((prevState) => ({
			displayedElements: [...prevState.displayedElements, current],
		}));
	}, accumulatedDelay);
	accumulatedDelay += this.calculateTimeouts(text, typing_speed);
	this.timeoutIds.push(timeoutId);
	return accumulatedDelay;
  }
 

  renderTypewriters(resume, interval) {
	let accumulatedDelay = 0;
	console.log(resume);
	Object.values(resume).forEach((element, index) => {
		console.log(element);
		accumulatedDelay = this.enqueueElement(accumulatedDelay, element.summary, "summary", 25) + interval;
		accumulatedDelay = this.enqueueElement(accumulatedDelay, element.roast, "roast", 60) + interval*2;
		accumulatedDelay = this.enqueueElement(accumulatedDelay, element.short_impactful_ironic_insult, "insult", 150) + interval*2;
	});
  }

  render() {
	const { displayedElements } = this.state;
	console.log(displayedElements);
	return (
	  <div className="flex flex-col items-center text-black w-full gap-4 py-4 overflow-x-hidden overflow-y-scroll h-80%">
		{displayedElements.map((text, idx) => (
			<div key={idx} className={`max-w-[80%] ${text.type == "insult" && "text-4xl" || text.type != "insult" && "text-xl"}`}>
				<Typewriter  text={text.text} color={text.type == "summary" && "bg-green-200" || !text.type == "roast" && "bg-white"} typingSpeed={text.typing_speed} padding={true} client:load />
			</div>
		))}
	  </div>
	);
  }
}

export default TypewriterList;
