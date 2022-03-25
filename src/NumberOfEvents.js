import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


export class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        infoText:''
      };

      handleInputChanged = (event) => {
        const value = event.target.value;
        if (value <= 0 || value > 32) {
          this.setState({
            numberOfEvents: "value",
            infoText:'Please do not enter a negative or a larger number than 32'
          });
        } else {
          this.setState({
            numberOfEvents: value,
            infoText:''
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
                <ErrorAlert text={this.state.infoText} />
            </div>
            
        )
    }
};

export default NumberOfEvents;