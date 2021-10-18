describe('Testing the app', () => {

    beforeEach(() => {
        cy.visit('localhost:3001/')
    })
    const searchBar = () => cy.get('.search')
    const info = () => cy.get('.info')
    const viewButton = () => cy.get('.MuiButton-label')
    const linkHome = () => cy.get('.headerLinks')
    const selectInput = () => cy.get('select[name=sortBySelected]')
    const asc = () => cy.get('.asc')
    const desc = () => cy.get('.desc')
    const reset = () => cy.get('.reset')
    const reviews = () => cy.get('.reviews')
    const ant = () => cy.get('.ant-pagination')

    it('check if it works', () => {
        expect(1+1).to.equal(2)
    })

    it('checks if searchbar, view of Card and link to home works', () => {
        searchBar().should('exist')
        searchBar().type('Bonnie')
        viewButton().should('exist')
        viewButton().click()
        cy.location('pathname').should('eq', '/view/9782989063047') 
        info().children('.author').contains('Bonnie')
        linkHome().should('exist')
        linkHome().children().click()
        cy.location('pathname').should('eq', '/') 
    })


    it('checks if ascending sort works', () => {
        selectInput().should('exist')
        asc().should('exist')
        reviews().should('exist')
        selectInput().select('rating')
        asc().click()
        asc().click()
        reviews().children().contains('0.1')
        reviews().children().contains('0.2')
        reviews().children().contains('0.6')
    })

    it('checks if descending sort and reset work', () => {
        selectInput().should('exist')
        desc().should('exist')
        reset().should('exist')
        reviews().should('exist')
        selectInput().select('rating')
        desc().click()
        desc().click()
        reviews().children().contains('5')
        reviews().children().contains('4.9')
        reviews().children().contains('4.7')
        reset().click()
        reviews().children().contains('0.8')
        reviews().children().contains('3.2')
    })
    
    it('checks if page switch works', () => {
        ant().should('exist')
        ant().contains(2).click()
        reviews().should('exist')
        reviews().children().contains('0.6')
        reviews().children().contains('4.7')
        reviews().children().contains('Wilma')
        ant().contains(12).click()
        reviews().children().contains('Seth')
        reviews().children().contains('1.1')
    })

})