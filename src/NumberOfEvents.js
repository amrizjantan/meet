import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        infoText:''
      };

      handleInputChanged = (event) => {
        const number = event.target.value;
        if (number <= 0 || number > 32) {
          this.setState({
            numberOfEvents: '',
            infoText:'No negative or a larger number than 32'
          });
        } else {
          this.setState({
            numberOfEvents: number,
            infoText:'',
          });
        }
        this.props.updateNumberOfEvents(event.target.value);
      };

    render() {
        return (
            <div>
                 <p>Number of Events:</p>
                 <input id="number-of-events__input" type="number" value={this.state.numberOfEvents} className="newValue" onChange={(e) => this.handleInputChanged(e)} />  
                <ErrorAlert text={this.state.infoText} />
               
            </div>   
        )
    }
};

export default NumberOfEvents;