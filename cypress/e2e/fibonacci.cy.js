import { APP_ADDRESS, CIRCLE_SELECTOR } from "../utils/constants";

describe("страница c последовательностью Фибоначчи работает правильно", function () {
  beforeEach(() => {
    cy.visit(APP_ADDRESS + "/fibonacci");
  });

  it("кнопка запуска недоступна при отсутствии текста", function () {
    Cypress.config("requestTimeout", 10000);
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("числа генерируются корректно", function () {
    const length = 5;
    let prev1 = 0;
    let prev2 = 1;
    cy.get("input").type(length);
    cy.contains("Сгенерировать").click();

    cy.wait(550 * length);

    cy.get(CIRCLE_SELECTOR).then((circles) => {
      expect(circles[0]).to.have.text(String(prev1));
      expect(circles[1]).to.have.text(String(prev2));
      for (let i = 2; i <= length; i++) {
        expect(circles[i]).to.have.text(String(prev1 + prev2));
        [prev1, prev2] = [prev2, prev1 + prev2];
      }
    });
  });
});
