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
    const { strings, interval } = this.props;
    this.renderTypewriters(strings, interval);
  }

  componentWillUnmount() {
    // Clear all timeouts on component unmount
    this.timeoutIds.forEach((id) => clearTimeout(id));
  }

  renderTypewriters(strings, interval) {
    strings.forEach((text, index) => {
      const timeoutId = setTimeout(() => {
        this.setState((prevState) => ({
          displayedElements: [...prevState.displayedElements, text],
        }));
      }, index * interval); // Delay each element by `index * interval`
      this.timeoutIds.push(timeoutId);
    });
  }

  render() {
    const { displayedElements } = this.state;

    return (
      <div className="flex flex-col items-center text-black w-full gap-1">
        {displayedElements.map((text, idx) => (
          <Typewriter key={idx} text={text} client:load />
        ))}
      </div>
    );
  }
}

export default TypewriterList;
