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
        cy.get(':nth-child(1) > :nth-child(2) > .segment > [placeholder="Modifier"]').type("-10").should('have.value', "-10");
        cy.get(':nth-child(2) > .segment > .primary').click();
        cy.get(':nth-child(1) > :nth-child(2) > .segment').contains("113");
    })
})

describe("Editor page works", () => {
    it("Editor page opens", () => {
        cy.login();
        cy.visit("127.0.0.1:3000/editor");
    })
    it("New character form can be added", () => {
        const testNPC = {
            name: "testNPC"
        }
        cy.login();
        cy.get('#leftList > .ui').click({force: true});
        cy.contains("Add a New Form");
        cy.get('.content > .ui').click({force: true});
        cy.contains("Add a new field");
        cy.get('#name').clear(); //tyhjennetään kenttä ennen muokkaamista, jotta vakioarvo ei tule mukaan
        cy.get('#name').type(testNPC.name).should('have.value', testNPC.name);
        cy.get('#inputForm > .primary').click();
        cy.get('#leftList').contains(testNPC.name).click();
        cy.get('.red').click();
        cy.contains(testNPC.name).should('not.exist'); //testataan löytyykö luotu lomake. jos löytyy heitetään virhe
    })
    it("Selectorfields work", () => {
        cy.login(); 
        const testValues= {
            name:"testNPC",
            fieldname: "testikenttä",
            fieldtype: "character"
        
        }
        //lisätään uusi hahmo
        cy.get('#leftList > .ui').click({force: true});
        cy.contains("Add a New Form");
        cy.get('.content > .ui').click({force: true});
        cy.contains("Add a new field");
        cy.get('#name').clear(); //tyhjennetään kenttä ennen muokkaamista, jotta vakioarvo ei tule mukaan
        cy.get('#name').type(testValues.name).should('have.value', testValues.name); 

        //Testataan uuden valintakentän lisäämistä

        cy.get('#Fieldname').type(testValues.fieldname).should("have.value", testValues.fieldname); //kirjoitetaan kenttään
        cy.get('#fieldTypeSelector').select("Selection"); //Valitsee kentän valintakentäksi
        cy.get('#selectionTypeSelector').select(testValues.fieldtype);
        cy.contains("Add a new field").click(); //lisätään kenttä lomakkeeseen

        cy.get('#Fieldname').clear(); //tyhjennetään nimikenttä
        cy.get('#inputForm').contains(testValues.fieldname);

        cy.get('#inputForm > .primary').click();
        cy.get('#leftList').contains(testValues.name).click();
        cy.get('.red').click();
        //cy.contains(testValues.name).should('not.exist'); //testataan löytyykö luotu lomake. jos löytyy heitetään virhe

    })
})