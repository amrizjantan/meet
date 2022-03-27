import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations } from './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';


class App extends Component{
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    infoText: null,
  }

  componentDidMount() {
    const { numberOfEvents } = this.state;
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }
  componentWillUnmount(){
    this.mounted = false;
  }


  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
          numberOfEvents: eventCount,
        });
      }
    });
  };

  showOnlineStatus = (event) => {
    if (!navigator.onLine) {
      this.setState({
        infoText: 'YOU ARE OFFLINE'
      });
    } else {
      this.setState({
        infoText: ''
      });
    }
  }

  render() {
    return (
      <div className="App">
        <OfflineAlert text={this.state.infoText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <br/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <br/>
        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents}/>
       
      </div>
    );
  }
}

export default App;
