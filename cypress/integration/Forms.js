describe('Different pages work', () => {
    it('frontpage opens', () => {
        cy.visit('127.0.0.1:3000');
    })
    it('settlement editor opens', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("Settlement Editor").click();
    })
    it('About page opens', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("About").click();
    })
    it('quest page opens', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("Quest").click();
    })
    it('Front page opens again', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("DM Web").click();
    })

})
describe("Open character editor", () => {
    it('charactereditor opens', () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("NPC Editor").click();
    })
    it("New character button works", () => {
        cy.contains("Add a new Character").click({force:true});
    })
    it("Character can be added", () => {
        cy.get('#name').type("testihahmo");
        cy.contains("Save").click();
        cy.contains("Settlement Editor").click();
        cy.contains("testihahmo");
    })
    it("Character can be removed", () => {
        cy.contains("testihahmo").click();
        cy.contains("Remove").click();
        cy.contains('testihahmo').should('not.exist');
    })
    it("Character can be added", () => {
        cy.visit('127.0.0.1:3000');
        cy.contains("NPC Editor").click();
        cy.contains("Add a new Character").click({force:true});
        cy.get('#name').type("testihahmo");
        cy.contains("Save").click();
        cy.contains("Settlement Editor").click();
        cy.contains("testihahmo");
        cy.contains("testihahmo").click();
        cy.get(':nth-child(2) > input').type("Lisäys");
        cy.contains("Save").click();
        cy.contains("Settlement Editor").click();
        cy.contains("testihahmo");
        cy.contains("testihahmo").click();
        cy.contains("Lisäys");
        cy.contains("Remove").click();
        cy.contains('testihahmo').should('not.exist');

    })
})