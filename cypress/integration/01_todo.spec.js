/// <reference types="Cypress" />


context('Todos', () => {
    it('add todos', ()=>{
        cy.visit(Cypress.env("baseUrl"))
        cy.clearLocalStorage()

        cy.getByTestid("todo").should('have.length',0)

        cy.getByTestid("add-todo-input").type("Learn Cypress!")
        cy.getByTestid("add-todo-button").click()
        cy.getByTestid("add-todo-input").type("Be happy!")
        cy.getByTestid("add-todo-button").click()
        cy.getByTestid("todo").should('have.length',2)

        cy.getByTestid("todo").children().first().should('have.text', 'Learn Cypress!')
        cy.getByTestid("pending-list").children().should('have.length',2)
        cy.getByTestid("paused-list").children().should('have.length',0)
    })

    it('pauses todos', () => {
        cy.contains('Do Later').should('not.exist')

        cy.getByTestid("pause-button").eq(1).click()
        cy.contains('Do Later').should('exist')

        cy.getByTestid("pending-list").children().should('have.length',1)
        cy.getByTestid("paused-list").children().should('have.length',1) 
    })

    it('resumes todos', () => {
        cy.contains('Do Later').should('exist').click()

        cy.getByTestid("paused-list").children().should('have.length',1)

        cy.getByTestid('resume-button').eq(0).click()
        cy.contains('Do Later').should('not.exist')
        cy.getByTestid('todo').should('have.length', 2)
    })
})