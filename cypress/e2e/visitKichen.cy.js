
describe ('vist test', () => {
    it('visit the kitchen sink',() => {
        cy.visit('https://example.cypress.io')
    })
})

describe ('vist test', function() {
    it('click the link "type"', function() {
        cy.visit('https://example.cypress.io')
        cy.contains('type').click()
    })
})
