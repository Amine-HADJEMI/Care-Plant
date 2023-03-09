import React from 'react'
import Login from './Login'
import { mount } from 'enzyme';

describe('<Login />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Login />)
  })
})


describe('Login component', () => {
  it('should display error message when invalid email or password is entered', () => {
    mount(<Login />);
    cy.get('input[type="email"]').type('invalid-email');
    cy.get('input[type="password"]').type('invalid-password');
    cy.get('button[type="submit"]').click();
    cy.contains('INVALID E-MAIL OR PASSWORD');
  });

  it('should navigate to Home screen when valid email and password are entered', () => {
    mount(<Login />);
    cy.get('input[type="email"]').type('valid-email');
    cy.get('input[type="password"]').type('valid-password');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/Home');
  });
});
