describe("Login flow", () => {
  it("Refuser les mauvais identifiants", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("badReUser");
    cy.get("#password").type("badPassword");
    cy.get("form").submit();

    cy.url().should("include", "?error=1");
    cy.get(".error-message").should("contain", "Identifiants incorrects");

    cy.wait(3000);
  });

  it("accepter les identifiants", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#username").type("admin");
    cy.get("#password").type("1234");
    cy.get("form").submit();

    cy.url().should("include", "/dashboard");
  });
});
