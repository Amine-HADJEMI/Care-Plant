import React from 'react'
import CameraApp from './CameraApp'

describe('<CameraApp />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CameraApp />)
  })
})