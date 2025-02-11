/// <reference types="cypress" />

describe("My First Test", () => {
  it("First test code", () => {
    cy.visit("/");
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
  it("Second test code", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layout").click();

    //Theory
    // get() - get a single element by locator globally
    // find() - find child elements by locator
    // contains() - find HTML text and by text and locator

    cy.contains("Sign in");
    cy.contains('[status="warning"]', "Sign in");
    cy.contains("nb-card", "Horizontal form").find("button");
    cy.contains("nb-card", "Horizontal form").contains("Sign in");
    cy.contains("nb-card", "Horizontal form").get("button");

    // Cypress chains and DOM
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();
  });
  it("Save subject of the command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.contains("nb-card", "Using the Grid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    //CANT DO THINGS LIKE THIS (make sure to use alias)
    // const usingTheGrid = cy.contains('nb-card','Using the Grid');
    // usingTheGrid.find('[for="inputEmail1"]').should('contain','Email');
    // usingTheGrid.find('[for="inputPassword2"]').should('contain','Password');

    //1. Cypress alias
    cy.contains("nb-card", "Using the Grid").as("usingTheGrid");
    cy.get("@usingTheGrid")
      .find('[for="inputEmail1"]')
      .should("contain", "Email");
    cy.get("@usingTheGrid")
      .find('[for="inputPassword2"]')
      .should("contain", "Password");

    //2. Cypress then() methids
    cy.contains("nb-card", "Using the Grid").then((usingTheGridForm) => {
      cy.wrap(usingTheGridForm)
        .find('[for="inputEmail1"]')
        .should("contain", "Email");
      cy.wrap(usingTheGridForm)
        .find('[for="inputPassword2"]')
        .should("contain", "Password");
    });
  });
  it("Extract text values", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // 1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");
    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      const labelText = label.text();
      expect(labelText).to.equal("Email address");
      cy.wrap(labelText).should("contain", "Email address");
    });
    //3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .as("labelText")
      .should("contain", "Email address");
    //4
    cy.get('[for="exampleInputEmail1"]')
      .invoke("attr", "class")
      .then((classValue) => {
        expect(classValue).to.equal("label");
      });
    //5 - check password with invoke property
    cy.get("#exampleInputEmail1").type("test@test.com");
    cy.get("#exampleInputEmail1")
      .invoke("prop", "value")
      .should("contain", "test@test.com")
      .then((property) => {
        expect(property).to.equal("test@test.com");
      });
  });
  it("Radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");
        cy.wrap(radioButtons).eq(1).check({ force: true });
        cy.wrap(radioButtons).eq(0).should("not.be.checked");
        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("Checkboxes", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.get('[type="checkbox"]').uncheck({ force: true });
    cy.get('type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });
  it("Date picker", () => {
    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDate = date.getDate();
      let futureMonth = date.toLocaleString("en-US", { month: "short" });
      let futureYear = date.getFullYear();
      let dateToAssert = `${futureMonth} ${futureDate}, ${futureYear}`;

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (
            !dateAttribute.includes(futureMonth) ||
            !dateAttribute.includes(futureYear)
          ) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get(".day-cell")
              .not(".bounding-month")
              .contains(futureDate)
              .click();
          }
        });
      return dateToAssert;
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();

        const dateToAssert = selectDayFromCurrent(5);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  });
  it("List and dropdowns", () => {
    cy.visit("/");

    // 1
    cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should("contain", "Dark");
    //2
    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim();
        cy.wrap(listItem).click();
        cy.wrap(dropdown).should("contain", itemText);
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });
  it("Web tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1 Get the row by text
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        cy.wrap(tableRow).find(".nb-edit").click();
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        cy.wrap(tableRow).find(".nb-checkmark").click();
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });
    // 2 Get the row by index
    cy.get("thead").find(".nb-plus").click();
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tableRow) => {
        cy.wrap(tableRow).find('[placeholder="First Name"]').type("John");
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type("Smith");
        cy.wrap(tableRow).find(".nb-checkmark").click();
      });
    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumns) => {
        cy.wrap(tableColumns).eq(2).should("contain", "John");
        cy.wrap(tableColumns).eq(3).should("contain", "Smith");
      });

    //3 Get each row validation
    const age = [20, 30, 40, 200];
    cy.wrap(age).each((age) => {
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });
  it("Tooltip", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });
  it("Dialog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    // 1
    // cy.get("tbody tr").first().find(".nb-trash").click();
    // cy.on("window:confirm", (confirm) => {
    //   expect(confirm).to.equal("Are you sure you want to delete?");
    // });
    // 2
    // const stub = cy.stub();
    // cy.on("window:confirm", stub);
    // cy.get("tbody tr")
    //   .first()
    //   .find(".nb-trash")
    //   .click()
    //   .then(() => {
    //     expect(stub.getCall(0)).to.be.calledWith(
    //       "Are you sure you want to delete?"
    //     );
    //   });
    // 3
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window:confirm", () => false);
  });
});
