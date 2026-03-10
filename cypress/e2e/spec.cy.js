describe('HR Portal - Main Functionality', () => {

  beforeEach(() => {
        // Resets both mock data docs to ensure a clean slate for each test
        cy.writeFile('cypress/fixtures/mockEmployees.json', [
            { "id": 1, "name": "Caitlin Pupich", "department": "Development", "email": "caitlin@example.com" },
            { "id": 2, "name": "Erik Chen", "department": "Design", "email": "erik@example.com" }
        ]);

        cy.writeFile('cypress/fixtures/mockUsers.json', [
            { 
                "id": 1, 
                "username": "testadmin", 
                "password": "password123" 
            }
        ]);
    });

  it('should load the login page successfully', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('h1').should('contain', 'HR Portal Login');
  });

  it('should display all mocked employees in the directory', () => {
    cy.visit('http://localhost:3000/directory');
    
    // Assertions based on your mockEmployees.json data
    cy.get('table').should('contain', 'Caitlin Pupich');
    cy.get('table').should('contain', 'Erik Chen'); 
  });

it('should successfully add and then delete a new employee', () => {
    // 1. Visit the dashboard where the form lives
    cy.visit('http://localhost:3000/dashboard'); 

    // 2. Fill the form
    cy.get('input[name="name"]').type('New Test Employee');
    cy.get('select[name="department"]').select('Engineering');
    
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="phone"]').type('123-456-7890');
    
    // 3. Submit
    cy.get('form').submit();

    // 4. Verify in Directory
    cy.url().should('include', '/directory');
    cy.get('table').should('contain', 'New Test Employee');

    // 5. Delete employee that was just added
    cy.contains('tr', 'New Test Employee').find('button').contains('Delete').click();

    // 6. Confirm Deletion
    cy.get('table').should('not.contain', 'New Test Employee');
});

it('should sign up a new admin, log in, and then clean up', () => {
    const tempUser = 'test_admin_' + Date.now();
    const tempPass = 'password123';

    // 1. SIGN UP
    cy.visit('http://localhost:3000/signup');
    cy.get('input[name="username"]').type(tempUser);
    cy.get('input[name="password"]').type(tempPass);
    cy.get('form').submit();

    // 2. LOG IN (Verify redirect to login happened)
    cy.url().should('include', '/login');
    cy.get('input[name="username"]').type(tempUser);
    cy.get('input[name="password"]').type(tempPass);
    cy.get('form').submit();

    // 3. VERIFY DASHBOARD ACCESS
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Admin Dashboard');
});

});