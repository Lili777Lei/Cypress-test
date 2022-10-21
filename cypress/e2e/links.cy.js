describe('test the links', () => {

  it("should contains logo", () => {
    cy.visit('https://cms-lyart.vercel.app/');
    cy.get('#logo').click();
  })

  it("nav should contains 5 links",() => {
    cy.visit('https://cms-lyart.vercel.app/');
    cy.get('#menu a').should('have.length','5').and('have.attr','href');
  })
  
  it("nav bar should be always on top",() =>{
    cy.visit('https://cms-lyart.vercel.app/');
    cy.get('#menu a').should('be.visible');
    cy.scrollTo('bottom');
  })

  it("canbe back home page via clicking logo",() =>{
    cy.visit('https://cms-lyart.vercel.app/events');
    cy.get('#logo').click();
    cy.visit('https://cms-lyart.vercel.app/gallery');
    cy.get('#logo').click();
  })

  it("links canbe redirected",() =>{
    cy.visit('https://cms-lyart.vercel.app/');
    cy.get('#menu > :nth-child(2) > :nth-child(1) > a').click();
    cy.url().should('include','gallery');
  })
})