/// <reference types="cypress" />

describe("My First Test", () => {
  it("First test code", () => {
    cy.visit("http://localhost:4200/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();
    //by Tag Name
    cy.get("input");

    //by  ID
    cy.get("#inputEmail");

    //by Class value
    cy.get(".input-full-width");

    //by Attribute name
    cy.get("[fullwidth]");

    //by Attribute name and value
    cy.get('[placeholder="Email"]');

    // by entire Calass value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    // by two attributes
    cy.get('[placeholder="Email"][fullwidth]');

    //by tag, attribute ID and Class
    cy.get('input[placeholder="Email"].input-full-width');

    // by cypress test ID
    cy.get('[data-cy="imputEmail1"]');
  });
});
