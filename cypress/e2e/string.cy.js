describe("страница разворота строки работает правильно", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
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
      cy.get('div[class^="circle_circle"]').then((circles) => {
        expect(circles[i].className).to.match(/circle_changing/);
        expect(circles[j].className).to.match(/circle_changing/);
      });
      cy.wait(1050);
      cy.get('div[class^="circle_circle"]').then((circles) => {
        expect(circles[i].className).to.match(/circle_modified/);
        expect(circles[j].className).to.match(/circle_modified/);
      });
      cy.wait(1050);
    }
  });
});
