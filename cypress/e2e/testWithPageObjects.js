// Page object model
// It becomes more readable and maintainable when we use the Page Object Model pattern.
// Reuse the same code in multiple tests.
// The code is more readable and maintainable.

import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatePickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe("test with Page Objects", () => {
  beforeEach("open application", () => {
    cy.openHomePage();
  });

  it("verify navigation across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datepickerPage();
    navigateTo.smartTablePage();
    navigateTo.tooltipPage();
    navigateTo.toasterPage();
  });
  it.only("should submit Inline and Basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInLineFormWithNameAndEmail(
      "Xios",
      "rrodriguez@theelectricfactory.com"
    );
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      "rrodriguez@theelectricfactory.com",
      "password"
    );
    navigateTo.datepickerPage();
    onDatePickerPage.selectCommonDatepickerDateFromToday(1);
    onDatePickerPage.selectDatepickerWithRangeFromToday(7, 14);
    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName("Xios", "Rodriguez");
    onSmartTablePage.updateAgeByFirstName("Xios", "40");
    onSmartTablePage.deleteRowByIndex(1);
  });
});
