import React, { ReactPropTypes } from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.less";

type city = {
  name?: string;
  lat?: number;
  lon?: number;
};

const cities: city[] = [
  { name: "Jakarta", lat: 43.6534817, lon: -79.3839347 },
  {
    name: "Vancouver",
    lat: 49.2608724,
    lon: -123.113952,
  },
  {
    name: "Toronto",
    lat: 43.6534817,
    lon: -79.3839347,
  },
];

type appState = {
  data: any;
  activeCity: number;
  isLoading: boolean;
};

class App extends React.Component {
  state: appState = {
    data: null,
    activeCity: 0,
    isLoading: true,
  };

  setData = (data: any) => {
    this.setState( current => ({...current, data}))
  }

  setLoading = (val: boolean) => {
    this.setState(current => ({...current, isLoading: val}))
  }

  setActiveCity = (val: number) => {
    this.setState(current => ({...current, activeCity: val}))
  }

  fetchData = () => {
    const { activeCity } = this.state;
    this.setLoading(true)
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${cities[activeCity].lat}&lon=${cities[activeCity].lon}&units=metric&appid=271da6b323b05ebaf2b4aaa0f3378f89`
    )
      .then((response) => response.json())
      .then((data) => {

        const {city, list} = data
        /**
         * Transform response data to just the data we want. 
         * API returns the 5 day forecast in 3 hour intervals with the 0th index being the current weather. 
         * 24/3 = 8 so the 8th index is +24 hours, the 16 index is +48 hours, etc. 
         * We only need up to +96 hours or the 32nd index.
         */
        this.setData({
          city,
          current: list[0],
          forecast: [list[8], list[16], list[24], list[32]]
        })
        this.setLoading(false)
      });
  };

  componentDidMount(): void {
    this.fetchData();
  }

  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<appState>, snapshot?: any): void {
    if(prevState.activeCity !== this.state.activeCity) {
      this.fetchData()
    }
  }

  render() {
    const { data, activeCity } = this.state;
    return (
      <div className="App">
        <p>Current City: {cities[activeCity].name}</p>
        <button onClick={() => {
          if(activeCity === 2) {
            this.setActiveCity(0)
          } else {
            this.setActiveCity(activeCity+1)
          }
        }}>change active city</button>
      </div>
    );
  }
}

export default App;
