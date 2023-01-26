import React from "react";
import "./App.less";

import type { city, weather } from "./helpers/types";
import WeatherIcon from "./components/WeatherIcon";

// hardcoded list of cities with lat/lon to reduce amt of API requests
const cities: city[] = [
  {
    name: "Jakarta",
    lat: -6.1753942,
    lon: 106.827183,
  },
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

type parsedData = {
  current: weather;
  forecast: weather[];
};

type appState = {
  data: parsedData | null;
  activeCity: number;
  isLoading: boolean;
};

// App is written as a class component to meet task requirements
class App extends React.Component {
  state: appState = {
    data: null,
    activeCity: 0,
    isLoading: true,
  };

  setData = (data: any) => {
    this.setState((current) => ({ ...current, data }));
  };

  setLoading = (val: boolean) => {
    this.setState((current) => ({ ...current, isLoading: val }));
  };

  setActiveCity = (val: number) => {
    this.setState((current) => ({ ...current, activeCity: val }));
  };

  fetchData = () => {
    const { activeCity } = this.state;
    this.setLoading(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${cities[activeCity].lat}&lon=${cities[activeCity].lon}&units=metric&appid=271da6b323b05ebaf2b4aaa0f3378f89`
    )
      .then((response) => response.json())
      .then((data) => {
        const { list } = data;
        /**
         * Transform response data to just the data we want.
         * API returns the 5 day forecast in 3 hour intervals with the 0th index being the current weather.
         * 24/3 = 8 so the 8th index is +24 hours, the 16 index is +48 hours, etc.
         * We only need up to +96 hours or the 32nd index.
         */
        this.setData({
          current: list[0],
          forecast: [list[8], list[16], list[24], list[32]],
        });
        this.setLoading(false);
      });
  };

  componentDidMount(): void {
    this.fetchData();
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<appState>,
    snapshot?: any
  ): void {
    if (prevState.activeCity !== this.state.activeCity) {
      this.fetchData();
    }
  }

  render() {
    const { data, activeCity, isLoading } = this.state;
    return (
      <div className="App">
        <div className="">
          {cities.map((city, i) => (
            <button key={city.name} onClick={() => this.setActiveCity(i)}>{city.name}</button>
          ))}
        </div>
        <div className="weather">
          {isLoading && <div>loading...</div>}
          {!isLoading && data && (
            <>
              <WeatherIcon weatherData={data.current} />
              <div className="forecast">
                {data?.forecast.map((day) => (
                  <WeatherIcon weatherData={day} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
