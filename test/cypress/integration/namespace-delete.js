describe('Delete a namespace', () => {
  let adminUsername = Cypress.env('username');
  let adminPassword = Cypress.env('password');

  before(() => {
    cy.login(adminUsername, adminPassword);
  });

  it('deletes a namespace', () => {
    cy.galaxykit('-i namespace create', 'testns1');
    cy.menuGo('Collections > Namespaces');
    cy.intercept(
      'GET',
      Cypress.env('prefix') + '_ui/v1/namespaces/?sort=name*',
    ).as('reload');
    cy.get('a[href*="ui/repo/published/testns1"]').click();
    cy.get('[data-cy=kebab-toggle]').click();
    cy.contains('Delete namespace').click();
    cy.get('input[id=delete_confirm]').click();
    cy.get('button').contains('Delete').click();
    cy.wait('@reload');
    cy.get('h4[class=pf-c-alert__title]').should(
      'have.text',
      'Success alert:Successfully deleted namespace.',
    );
  });
});
