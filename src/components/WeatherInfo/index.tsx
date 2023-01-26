import type { weather } from "../../helpers/types";
import iconMap from "../../helpers/iconMap";
import "./WeatherInfo.less";

type props = {
  weatherData: weather;
  isForecast?: boolean;
};

const WeatherInfo = ({ weatherData, isForecast = false }: props) => {
  const date = new Date(weatherData.dt_txt);
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
      <p className="day">{day}</p>
      <img
        className="icon"
        src={iconMap[conditions.icon]}
      />
      <p className="temp">
        {Math.floor(weatherData.main.temp)}°
        {!isForecast && (
          <span className="description">{conditions.main}</span>
        )}
      </p>
    </div>
  );
};

export default WeatherInfo;
