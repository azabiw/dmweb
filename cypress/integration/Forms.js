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
})