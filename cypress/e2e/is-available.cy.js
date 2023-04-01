import { APP_ADDRESS } from "../utils/constants";

describe('приложение работоспособно', function() {
    it('страница есть на сервере', function() {
      cy.visit(APP_ADDRESS);
      cy.contains('МБОУ АЛГОСОШ');
    });

    it('должна быть доступна страница разворота строки', function() {
      cy.visit(APP_ADDRESS + '/recursion');
      cy.contains('Строка');
    });

    it('должна быть доступна страница последовательности Фибоначчи', function() {
      cy.visit(APP_ADDRESS + '/fibonacci');
      cy.contains('Последовательность Фибоначчи');
    });

    it('должна быть доступна страница сортировок', function() {
      cy.visit(APP_ADDRESS + '/sorting');
      cy.contains('Сортировка массива');
    });

    it('должна быть доступна страница стека', function() {
      cy.visit(APP_ADDRESS + '/stack');
      cy.contains('Стек');
    });

    it('должна быть доступна страница очереди', function() {
      cy.visit(APP_ADDRESS + '/queue');
      cy.contains('Очередь');
    });

    it('должна быть доступна страница списка', function() {
      cy.visit(APP_ADDRESS + '/list');
      cy.contains('Связный список');
    });
  }); 