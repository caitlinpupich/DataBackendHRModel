describe('HR Portal - Error Handling', () => {

    it('should display the custom 404 page for broken links', () => {
        // Visit a page that doesn't exist. 
        // {failOnStatusCode: false} prevents Cypress from stopping the test early
        cy.visit('http://localhost:3000/invalid-page-path', { failOnStatusCode: false });

        // Verify your 404.pug logic is working
        cy.get('h1').should('contain', '404');
        cy.contains('/invalid-page-path').should('be.visible');
    });


    it('should show the 500 page when the data file is missing', () => {
    // 1. Physically remove the file from the fixtures folder to force an error
    // This forces an ENOENT (Error No Entity) on the server side
    cy.exec('del cypress\\fixtures\\mockEmployees.json', { failOnNonZeroExit: false });

    // 2. Visit the directory
    // If your code tries to read a file that isn't there, it should crash
    cy.visit('http://localhost:3000/directory', { failOnStatusCode: false });

    // 3. Verify the Pug error page is displayed
    cy.get('h1').should('contain', 'Something Went Wrong');
    cy.contains('Our server encountered an error. Please try again later.').should('be.visible');
});

});