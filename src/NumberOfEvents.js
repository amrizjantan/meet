import React, { Component } from 'react';


export class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        message: "",
      };

      handleInputChanged = (event) => {
        const number = event.target.value;
        if (number <= 0 || number > 32) {
          this.setState({
            message: "Please enter a number between 1 and 32",
          });
        } else {
          this.setState({
            numberOfEvents: number,
            message: "",
          });
        }
      };

    render() {
        return (
            <div className="NumberOfEvents">
                 <p>Number of Events:</p>
                <input type="number" className="newValue"
                    value={this.state.NumberOfEvents}
                    onChange={this.handleInputChanged} />
            </div>
        )
    }
};

export default NumberOfEvents;