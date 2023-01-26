import type { weather } from "../../helpers/types";


type props = {
  weatherData: weather;
};

const WeatherIcon = ({ weatherData }: props) => {
  const date = new Date(weatherData.dt_txt)
  const today = new Date(Date.now())

  // replace current day with Today
  let day = date.getDay() === today.getDay() ? 'Today' : date.toLocaleDateString(undefined, {weekday: "long"})

  return (
    <div>
      {day}
      <img
        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      />
      <p>{weatherData.main.temp}°</p>
      <p>{weatherData.weather[0].main}</p>
    </div>
  );
};

export default WeatherIcon;
