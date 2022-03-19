import React, { Component } from 'react';


export class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        message: "",
      };

      handleInputChanged = (event) => {
        const value = event.target.value;
        if (value <= 1 || value > 32) {
          this.setState({
            numberOfEvents: "",
            message: "Please enter a number between 1 and 32",
          });
        } else {
          this.setState({
            numberOfEvents: value,
            message: "",
          });
        }
      };

    render() {
        return (
            <div className="NumberOfEvents">
                 <p>Number of Events:</p>
                <input type="number" className="numberOfEvents"
                    value={this.state.numberOfEvents}
                    onChange={this.handleInputChanged} />
            </div>
        )
    }
};

export default NumberOfEvents;