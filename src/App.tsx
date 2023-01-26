import React from "react";
import "./App.less";

import type { city, weather } from "./helpers/types";
import WeatherInfo from "./components/WeatherInfo";

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

const key = import.meta.env.VITE_API_KEY

type parsedData = {
  current: weather;
  forecast: weather[];
};

type appState = {
  data: parsedData | null;
  activeCity: number;
  isLoading: boolean;
  error?: string;
};

// App is written as a class component to meet task requirements
class App extends React.Component {
  state: appState = {
    data: null,
    activeCity: 0,
    isLoading: true,
    error: "",
  };

  setData = (data: any) => {
    this.setState((current) => ({ ...current, data, isLoading: false }));
  };

  setLoading = (val: boolean) => {
    this.setState((current) => ({ ...current, isLoading: val }));
  };

  setActiveCity = (val: number) => {
    this.setState((current) => ({ ...current, activeCity: val }));
  };

  setError = (val: string) => {
    this.setState((current) => ({ ...current, error: val, isLoading: false }));
  };

  fetchDataWithLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.fetchData({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          });
        },
        (error) => {
          this.setError("Unable to get location. Please check your browser and OS permissions");
        }
      );
    }
  };

  fetchData = async (loc: null | { lat: number; lon: number } = null) => {
    let lat = loc?.lat || cities[this.state.activeCity]?.lat;
    let lon = loc?.lon || cities[this.state.activeCity]?.lon;
    let response
    this.setLoading(true);

    try {
      response = await fetch(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
      )
    } catch(error) {
      console.error(error);
      this.setError(`Connection error occured.`)
    }

    if(response?.ok) {
      const { list } = await response.json()
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
    } else {
      this.setError(`Problem connecting to API. Please try again later`)
      console.error(response)
    }
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
      this.state.activeCity === -1
        ? this.fetchDataWithLocation()
        : this.fetchData();
    }
  }

  render() {
    const { data, activeCity, isLoading, error } = this.state;
    const valid = !isLoading && data && !error;
    return (
      <div className="App">
        <div className="city-select">
          {cities.map((city, i) => (
            <button
              key={city.name}
              onClick={() => this.setActiveCity(i)}
              className={`city-select__city${
                activeCity === i ? " active" : ""
              }`}
            >
              {city.name}
            </button>
          ))}
          <button 
            onClick={() => {
              this.setActiveCity(-1) // setActive to -1 to denote going outside of cities list
            }}
            className={`city-select__city${
              activeCity === -1 ? " active" : ""
            }`}
            >
            Current Location
          </button>
        </div>
        <div className="weather">
          {isLoading && <div>loading...</div>}
          {!isLoading && error && <div>{error}</div>}
          {valid && (
            <>
              <WeatherInfo weatherData={data.current} />
              <div className="weather__forecast">
                {data?.forecast.map((day, i) => (
                  <WeatherInfo
                    key={`${i}_${day.dt_txt}`}
                    weatherData={day}
                    isForecast
                  />
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
