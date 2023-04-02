import { APP_ADDRESS, CIRCLE_SELECTOR, CIRCLE_MODIFIED_MATCH, CIRCLE_CHANGE_MATCH } from "../utils/constants";

describe("страница разворота строки работает правильно", function () {
  beforeEach(() => {
    cy.visit("recursion");
  });

  it("кнопка запуска недоступна при отсутствии текста", function () {
    Cypress.config("requestTimeout", 10000);
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("разворот строки корректен", function () {
    const text = "qwe";
    const textLength = text.length;
    cy.get("input").type(text);
    cy.contains("Развернуть").click();

    for (let i = 0, j = textLength - 1; i <= j; i++, j--) {
      cy.get(CIRCLE_SELECTOR).then((circles) => {
        expect(circles[i].className).to.match(CIRCLE_CHANGE_MATCH);
        expect(circles[j].className).to.match(CIRCLE_CHANGE_MATCH);
      });
      cy.wait(1050);
      cy.get(CIRCLE_SELECTOR).then((circles) => {
        expect(circles[i].className).to.match(CIRCLE_MODIFIED_MATCH);
        expect(circles[j].className).to.match(CIRCLE_MODIFIED_MATCH);
      });
      cy.wait(1050);
    }
  });
});
