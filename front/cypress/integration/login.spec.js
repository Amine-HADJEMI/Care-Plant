describe("Login", () => {
    it("renders correctly", () => {
      cy.visit("/");
      cy.get("#loginView").should("exist");
    });
  });

  describe("Login", () => {
    it("displays email and password input fields", () => {
      cy.visit("/");
      cy.get("#emailInput").should("exist");
      cy.get("#passwordInput").should("exist");
    });
  });
  

  describe("Login", () => {
    it("displays error message when incorrect login details are entered", () => {
      cy.visit("/");
      cy.get("#emailInput").type("wrongemail@example.com");
      cy.get("#passwordInput").type("wrongpassword");
      cy.get("#loginBtn").click();
      cy.get("#errorMessage").should("contain", "INVALID E-MAIL OR PASSWORD");
    });
  });

  describe("Login", () => {
    it("allows user to login with correct login details", () => {
      cy.visit("/");
      cy.get("#emailInput").type("test@example.com");
      cy.get("#passwordInput").type("password123");
      cy.get("#loginBtn").click();
      cy.url().should("include", "/Home");
    });
  });

  describe("Login", () => {
    it("navigates to signup page when signup button is clicked", () => {
      cy.visit("/");
      cy.get("#signupBtn").click();
      cy.url().should("include", "/Signup");
    });
  });

  describe('Login component', () => {
    it('should display error message when invalid email or password is entered', () => {
      mount(<Login />);
      cy.get('input[type="email"]').type('invalid-email');
      cy.get('input[type="password"]').type('invalid-password');
      cy.get('button[type="submit"]').click();
      cy.contains('INVALID E-MAIL OR PASSWORD');
    });
  
    it('should navigate to Home screen when valid email and password are entered', () => {
      mount(<Login />);
      cy.get('input[type="email"]').type('valid-email');
      cy.get('input[type="password"]').type('valid-password');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/Home');
    });
  });
  