describe('Home component', () => {

  it('home works', () => {
    cy.visit('http://localhost:4200/home');
    cy.contains('home works!');
  });

});
