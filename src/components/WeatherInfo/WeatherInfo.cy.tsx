import React from 'react'
import { weather } from '../../helpers/types'
import WeatherInfo from './index'

const mockWeather: weather = {
  dt: Date.now()/1000, //Divide by 1000 to match API response. API sends over unix time in seconds.
  dt_txt: new Date (Date.now()).toUTCString(),
  main: {
    temp: 22,
  },
  weather: [{
    description: 'test',
    icon: '10n',
    main: 'test',
    id: 123
  }]
}

describe('<WeatherInfo />', () => {
  
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WeatherInfo weatherData={mockWeather}/>)
  })
})