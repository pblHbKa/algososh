import { APP_ADDRESS, CIRCLE_CONTENT_SELECTOR, CIRCLE_SELECTOR } from "../utils/constants";

describe("страница c очередью работает правильно", function () {
  beforeEach(() => {
    cy.visit(APP_ADDRESS + "/queue");
  });

  it("кнопка запуска недоступна при отсутствии текста", function () {
    Cypress.config("requestTimeout", 10000);
    cy.get("input").should("be.empty");
    cy.contains("Добавить").should("be.disabled");
  });

  it("элементы в очередь добавляются корректно", function () {
    cy.get("input").type(1);
    cy.contains("Добавить").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0].className).to.match(/circle_changing/);
      expect(circles[0]).to.have.text(1);
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children().eq(0).should($div => {
      expect($div).to.have.text("head");
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children().eq(3).should($div => {
      expect($div).to.have.text("tail");
    });
    cy.wait(500);
    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0].className).to.match(/circle_default/);
    });

    cy.get("input").type(2);
    cy.contains("Добавить").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[1].className).to.match(/circle_changing/);
      expect(circles[0].className).to.match(/circle_default/);
      expect(circles[1]).to.have.text(2);
    });
    cy.wait(500);
    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[1].className).to.match(/circle_default/);
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children().eq(0).should($div => {
      expect($div).to.have.text("head");
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(1).children().eq(3).should($div => {
      expect($div).to.have.text("tail");
    });
  });

  it("элементы из очереди удаляются корректно", function () {
    cy.get("input").type(1);
    cy.contains("Добавить").click();
    cy.wait(500);
    cy.get("input").type(2);
    cy.contains("Добавить").click();
    cy.contains("Удалить").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[1].className).to.match(/circle_default/);
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(1).children().eq(0).should($div => {
      expect($div).to.have.text("head");
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(1).children().eq(3).should($div => {
      expect($div).to.have.text("tail");
    });
  });

  it("элементы в очереди очищаются корректно", function () {
    cy.get("input").type(1);
    cy.contains("Добавить").click();
    cy.wait(500);
    cy.get("input").type(2);
    cy.contains("Добавить").click();
    cy.wait(500);
    cy.contains("Очистить").click();
    cy.wait(500);

    cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children().eq(0).should($div => {
      expect($div).to.have.text("head");
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children().eq(3).should($div => {
      expect($div).to.have.text("tail");
    });
    cy.get(CIRCLE_SELECTOR).each($circle => {
      expect($circle).to.have.text('');
  });
  });
});
