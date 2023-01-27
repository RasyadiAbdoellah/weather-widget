import React from 'react'
import CityButton from './index'

describe('<CityButton />', () => {

  beforeEach(() => {
    cy.mount(<CityButton city="test city" clickHandler={cy.stub().as('clickHandler')}/>)
  })

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
  })

  it('calls clickHandler when clicked', () => {
    cy.get('button').click()
    cy.get('@clickHandler').should('have.been.called')
  })
})