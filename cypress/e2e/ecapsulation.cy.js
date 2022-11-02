/// <reference types = "Cypress" />

describe('manager account login', () => {
    it('login success', () => {
        //cy.visit('https://cms-lyart.vercel.app/login')
        //cy.get('.ant-radio-button-wrapper').contains('Manager').click();
        cy.login("manager@admin.com","111111"); // 封装代码login怎么用？这个不能run 
    })
})