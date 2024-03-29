import { APP_ADDRESS, CIRCLE_CHANGE_MATCH, CIRCLE_DEFAULT_MATCH, CIRCLE_SELECTOR } from "../utils/constants";

describe("страница cо стеком работает правильно", function () {
  beforeEach(() => {
    cy.visit("stack");
  });

  it("кнопка запуска недоступна при отсутствии текста", function () {
    Cypress.config("requestTimeout", 10000);
    cy.get("input").should("be.empty");
    cy.contains("Добавить").should("be.disabled");
  });

  it("элементы в стек добавляются корректно", function () {
    cy.get("input").type(1);
    cy.contains("Добавить").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0].className).to.match(CIRCLE_CHANGE_MATCH);
    });
    cy.wait(500);
    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0].className).to.match(CIRCLE_DEFAULT_MATCH);
    });

    cy.get("input").type(2);
    cy.contains("Добавить").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[1].className).to.match(CIRCLE_CHANGE_MATCH);
      expect(circles[0].className).to.match(CIRCLE_DEFAULT_MATCH);
      expect(circles[1]).to.have.text(2);
    });
    cy.wait(500);
    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[1].className).to.match(CIRCLE_DEFAULT_MATCH);
    });
  });

  it("элементы в стеке удаляются корректно", function () {
    cy.get("input").type(1);
    cy.contains("Добавить").click();
    cy.get("input").type(2);
    cy.contains("Добавить").click();
    cy.contains("Удалить").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[1].className).to.match(CIRCLE_CHANGE_MATCH);
    });
    cy.wait(500);
    cy.get(CIRCLE_SELECTOR).should("have.length", 1);
  });

  it("элементы в стеке очищаются корректно", function () {
    cy.get("input").type(1);
    cy.contains("Добавить").click();
    cy.get("input").type(2);
    cy.contains("Добавить").click();
    cy.contains("Очистить").click();

    cy.get(CIRCLE_SELECTOR).should("have.length", 0);
  });
});
