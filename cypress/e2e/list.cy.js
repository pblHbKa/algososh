import { APP_ADDRESS, CIRCLE_CONTENT_SELECTOR, CIRCLE_SELECTOR } from "../utils/constants";

describe("страница cо списком работает правильно", function () {
  beforeEach(() => {
    cy.visit(APP_ADDRESS + "/list");
  });

  it("кнопка запуска недоступна при отсутствии текста", function () {
    Cypress.config("requestTimeout", 10000);
    cy.get("input").should("be.empty");
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
  });

  it("корректно отрисовывается дефолтный список", function () {
    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0]).to.have.text("0");
      expect(circles[1]).to.have.text("34");
      expect(circles[2]).to.have.text("8");
      expect(circles[3]).to.have.text("1");
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children().eq(0).should($div => {
      expect($div).to.have.text("head");
    });
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(3).children().eq(3).should($div => {
      expect($div).to.have.text("tail");
    });
  });

  it("элементы в head добавляются корректно", function () {
    const el = "999";
    cy.get("input").eq(0).type(el);
    cy.contains("Добавить в head").click();

    cy.get(CIRCLE_CONTENT_SELECTOR).then((circles) => {
      expect(circles.children().eq(0)).to.have.text(el);
    });

    cy.wait(1000);

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0].className).to.match(/circle_modified/);
      expect(circles[0]).to.have.text(el);
    });
    
    cy.get(CIRCLE_CONTENT_SELECTOR).then((circles) => {
      expect(circles.children().eq(0)).to.have.text("head");
    });
  });

  it("элементы в tail добавляются корректно", function () {
    const el = "888";
    const initSize = 4;
    cy.get("input").eq(0).type(el);
    cy.contains("Добавить в tail").click();

    cy.get(CIRCLE_CONTENT_SELECTOR).eq(initSize-1).children().eq(0).should($div => {
      expect($div).to.have.text(el);
    });

    cy.wait(1000);

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[initSize].className).to.match(/circle_modified/);
      expect(circles[initSize]).to.have.text(el);
    });
    
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(initSize).children().eq(3).should($div => {
      expect($div).to.have.text("tail");
    });
  });

  it("элементы по индексу добавляются корректно", function () {
    const el = "777";
    const index = 2;
    cy.get("input").eq(0).type(el);
    cy.get("input").eq(1).type(index);
    cy.contains("Добавить по индексу").click();

    cy.get(CIRCLE_CONTENT_SELECTOR).eq(index).children().eq(0).should($div => {
      expect($div).to.have.text(el);
    });

    cy.wait(1000);

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[index].className).to.match(/circle_modified/);
      expect(circles[index]).to.have.text(el);
    });
    
  });

  it("элементы из head удаляются корректно", function () {
    cy.contains("Удалить из head").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0].className).to.match(/circle_changing/);
    });

    cy.wait(1000);

    cy.get(CIRCLE_CONTENT_SELECTOR).eq(0).children().eq(3).should($div => {
      expect($div).to.have.text("0");
    });

    cy.wait(1000);

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0]).to.have.text("34");
    });
    
    cy.get(CIRCLE_CONTENT_SELECTOR).then((circles) => {
      expect(circles.children().eq(0)).to.have.text("head");
    });
  });

  it("элементы из tail удаляются корректно", function () {
    cy.contains("Удалить из tail").click();

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[3].className).to.match(/circle_changing/);
    });

    cy.wait(1000);

    cy.get(CIRCLE_CONTENT_SELECTOR).eq(3).children().eq(3).should($div => {
      expect($div).to.have.text("1");
    });

    cy.wait(1000);
    
    cy.get(CIRCLE_CONTENT_SELECTOR).eq(2).children().eq(3).should($div => {
      expect($div).to.have.text("tail");
    });
  });

  it("элементы из индексу удаляются корректно", function () {
    const index = 1;
    cy.get("input").eq(0).type(index);
    cy.get("input").eq(1).type(index);
    cy.contains("Удалить по индексу").click();

    cy.wait(1000*(index+1));

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[index].className).to.match(/circle_changing/);
    });

    cy.get(CIRCLE_CONTENT_SELECTOR).eq(index).should($div => {
      expect($div.children().eq(3)).to.have.text("34");
    });

    cy.wait(1000);
    
    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[index]).to.have.text("8");
    });

  });
});
