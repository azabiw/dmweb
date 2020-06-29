/* eslint-disable no-undef */
/// <reference types="Cypress" />
describe('Different pages work', () => {
    it('frontpage opens', () => {
        cy.visit('127.0.0.1:3000');
    })
    it('editor opens', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("Editor").click();
    })
    it('About page opens', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("About").click();
    })
    it('Front page opens again', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("DM Web").click();
    })

})
describe("Hp counter works", () => {
    it("page opens from url", () => {
        cy.visit('127.0.0.1:3000/hpc');        
    })
    it("page opens from header", () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("HP Counter").click();        
    })
    it("character can be added with default hp", () => {
        const testName = "testi hahmo";
        cy.get('[placeholder="Name"]').type(testName)
        .should('have.value', testName);
        cy.contains("Add a New Character").click();
        cy.contains(testName);
        cy.get(':nth-child(1) > .segment').contains("10"); //vakio arvo
    })
    it("Second character can be added with custom hp", () => {
        const npc = "asdasdasdasd";
        const testHP = "123";
        cy.get('[placeholder="Name"]').type(npc).should('have.value', npc);
        cy.get('[placeholder="HP"]').type(testHP).should('have.value', testHP);
        cy.contains("Add a New Character").click();
        cy.get(':nth-child(1) > :nth-child(2) > .segment').contains(npc);
        cy.get(':nth-child(1) > :nth-child(2) > .segment').contains(testHP);
    } )
    it("HP calculation works", () =>{
        const testHP = "123";
        cy.get(':nth-child(1) > :nth-child(2) > .segment > [placeholder="Modifier"]').type("-10").should('have.value', "-10");
        cy.get(':nth-child(2) > .segment > .primary').click();
        cy.get(':nth-child(1) > :nth-child(2) > .segment').contains("113");
    })
})

describe("Some Test", () => {
    it("Adds document to test_hello_world collection of Firestore", () => {
      cy.callFirestore("add", "test_hello_world", { some: "value" });
    });
  });