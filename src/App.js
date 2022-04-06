import React, {Component} from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';
import EventGenre from './EventGenre';


class App extends Component{
  state = {
    events: [],
    locations: [],
    showWelcomeScreen: undefined,
    numberOfEvents: 32,
    infoText:'',

  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
      const shownEvents = locationEvents.slice(0, this.state.numberOfEvents);
      this.setState({
        events: shownEvents,
        currentLocation: location
      });
    });
  }

  updateNumberOfEvents = (number) => {
    const newNum = number;
    this.setState({
      numberOfEvents: newNum
    });
    this.updateEvents(this.state.currentLocation);
  };

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false: true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
        }
      });
    }    
  }
 
  componentWillUnmount(){
    this.mounted = false;
  }


  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const { numberOfEvents, locations, events } = this.state;

    return (
      <div className="App">
        <h1>Meet App</h1>
        <h4>Choose your city</h4>
        <CitySearch locations={locations} updateEvents={this.updateEvents}/>
        <br/>
        <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        
        <h4>Events in each city</h4>
        <div className='data-vis-wrapper'>
        <EventGenre className="pie-chart" events={events} />
        <ResponsiveContainer height={400}>
        <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="city" name="city" />
                <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false}/>
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={this.getData()} fill="#8884d8" />
              </ScatterChart>
            </ResponsiveContainer>
            </div>     

        <EventList events={events}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} /> 
      </div>
    );
  }
}

export default App;
