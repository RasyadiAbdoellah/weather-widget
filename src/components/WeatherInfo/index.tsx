import type { weather } from "../../helpers/types";
import iconMap from "../../helpers/iconMap";
import "./WeatherInfo.less";

type props = {
  weatherData: weather;
  isForecast?: boolean;
};

const WeatherInfo = ({ weatherData, isForecast = false }: props) => {
  const date = new Date(weatherData.dt * 1000); //dt is unix time in seconds, * 1000 to convert to milliseconds
  const today = new Date(Date.now());
  const conditions = weatherData.weather[0]
  // replace current day with Today
  let day =
    date.getDay() === today.getDay()
      ? "Today"
      : date.toLocaleDateString(undefined, { weekday: "short" });

  return (
    <div
      className={`weather-info ${
        isForecast ? "weather-info--forecast" : "weather-info--current"
      }`}
    >
      <h1 className="day">{day}</h1>
      <img
        className="icon"
        src={iconMap[conditions.icon]}
        alt={conditions.main}
      />
      <div className="temp">
        <p className="value">
          {Math.floor(weatherData.main.temp)}°
        </p>
        {!isForecast && (
          <p className="description">{conditions.main}</p>
        )}

      </div>
    </div>
  );
};

export default WeatherInfo;
