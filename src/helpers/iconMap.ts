// Import the desired custom icons. Icons are from https://github.com/basmilius/weather-icons.
import clearDay from '@bybas/weather-icons/production/fill/svg/clear-day.svg'
import clearNight from '@bybas/weather-icons/production/fill/svg/clear-night.svg'
import cloudy from '@bybas/weather-icons/production/fill/svg/cloudy.svg'
import cloudyDay from '@bybas/weather-icons/production/fill/svg/partly-cloudy-day.svg'
import cloudyNight from '@bybas/weather-icons/production/fill/svg/partly-cloudy-night.svg'
import drizzle from '@bybas/weather-icons/production/fill/svg/overcast-drizzle.svg'
import mist from '@bybas/weather-icons/production/fill/svg/mist.svg'
import overcast from '@bybas/weather-icons/production/fill/svg/overcast.svg'
import rainDay from '@bybas/weather-icons/production/fill/svg/overcast-day-rain.svg'
import rainNight from '@bybas/weather-icons/production/fill/svg/overcast-night-rain.svg'
import thunderstorms from '@bybas/weather-icons/production/fill/svg/thunderstorms.svg'
import snow from '@bybas/weather-icons/production/fill/svg/snow.svg'

// Map OpenWeatherMap API weather icon codes to custom icons.
// complete list of icon codes is found here https://openweathermap.org/weather-conditions#Icon-list
export default {
  '01d': clearDay,
  '01n': clearNight,
  '02d': cloudyDay,
  '02n': cloudyNight,
  '03d': cloudy,
  '03n': cloudy,
  '04d': overcast,
  '04n': overcast,
  '09d': drizzle,
  '09n': drizzle,
  '10d': rainDay,
  '10n': rainNight,
  '11d': thunderstorms,
  '11n': thunderstorms, 
  '13d': snow,
  '13n': snow,
  '50d': mist,
  '50n': mist,
} as {
  [key: string]: string;
}