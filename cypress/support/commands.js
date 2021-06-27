
// instead create each time this=>
//cy.get('[data-testid="todo"]')
// we create the global code above to use

Cypress.Commands.add('getByTestid', id => {
    cy.get(`[data-testid="${id}"]`)
})