describe('CyberDex.io', () => {
  it('visits the website', () => {
    cy.visit('http://localhost:3000');
  });
  it('redirects to the details page when clicking a card', () => {
    cy.get(".MuiGrid-spacing-xs-2 > :nth-child(1)").click()
    cy.url().should('include', '/coin/' )
  })
  it('should redirect to the home screen on icon click', () => {
    cy.get('.MuiIconButton-edgeStart > img').click()
    cy.get(".MuiGrid-spacing-xs-2 > :nth-child(1)").should('exist')
  })
  it('should direct to the coins screen whenever the navbar link is clicked', () => {
    cy.get('.MuiToolbar-root > :nth-child(2)').click()
    cy.url().should('include', 'localhost:3000/search')
  })
  it('should change page whenever the number is clicked on the pagination', () => {
    cy.get(':nth-child(1) > .MuiBox-root > .MuiPagination-root > .MuiPagination-ul > :nth-child(3) > .MuiButtonBase-root').click()
    cy.get(':nth-child(1) > .MuiButtonBase-root > .MuiPaper-root > .MuiBox-root').click()
  })
  it('should move to the Exchanges page when clicked', () => {
    cy.get('.MuiPaper-root > .MuiToolbar-root > :nth-child(3)').click()
    cy.url().should('include', 'exchange')
  })
  it('should move to the specific exchange page when clicked', () => {
    cy.get(':nth-child(1) > :nth-child(1) > a').click()
  })
  it('should move to the advanced search page when clicked', () => {
    cy.get(':nth-child(4) > .MuiTypography-root').click()
    cy.url().should('include', 'advancedsearch')
  })
});
