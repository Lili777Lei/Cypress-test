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

/// <reference types ="cypress" />

Cypress.Commands.add('login',(email,password) => {
    const loginPath = '/login';
    const log = Cypress.log({
        name: 'login',
        displayName: 'LOGIN',
        message: ['authenticating | ${email}'],
        autoEnd: false,
    });

    cy.location('pathname').then((currentPath) => {
        if (currentPath !== loginPath) {
            cy.visit(loginPath);
        }
    });

    cy.intercept('POST','/api/login',{
        code: 200,
        msg: 'success',
        data: {
            userId: 3,
            token: Cypress.env().managerToken,
            role: 'manager',
        },
    }).as('loginUser');

    log.snapshot('before');

    cy.get('label').contains('Manager').click();
    cy.getInputByType('email').type(email);
    cy.getInputByType('password').type(password);

    cy.get('button[type=submit]').click();

    cy.wait('@loginUser').then((res) => {
        const user = res.response.body.data;
        Cypress.env('token',user.token);
        log.set({
            consoleProps() {
                return {
                    userId: user.userId,
                    role: user,role,
                    token: user.token,
                };
            },
        });
    });

    log.snapshot('after');
    log.end();
})