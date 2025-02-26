// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () =>{
    cy.get('#firstName').type('Felipe', {delay:0});
    cy.get('#lastName').type('Galdino', {delay:0});
    cy.get('#email').type('felipegaldino@email.com.br', {delay:0});
    cy.get('#phone').type('11999999999', {delay:0});
    cy.get('#open-text-area').type('Preciso de suporte', {delay:0});
    cy.contains('.button','Enviar' ).click();
    cy.get('.success').should('be.visible')
})
