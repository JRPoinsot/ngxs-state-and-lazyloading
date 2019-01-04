describe('User component', () => {

  it('User component loaded', () => {
    cy.visit('http://localhost:4200/users');
    cy.contains('User Form');
    cy.contains('User List');
  });

  it('Create user Thierry Henry as ADMIN', () => {
    cy.get('#adduserbutton')
      .should('have.attr', 'disabled')
      .get('#firstnameinput')
      .type('Thierry Henry')
      .get('#emailinput')
      .type('h.thierry@gmail.com')
      .get('#selectrole').click()
      .get('#mat-option-1').click()
      .get('#adduserbutton')
      .should('not.have.attr', 'disabled')
      .get('#adduserbutton').click()
      .get('#firstnameinput')
      .should('have.value', '')
      .get('#emailinput')
      .should('have.value', '')
      .get('#ADMIN')
      .contains('Thierry Henry');
  });

});
