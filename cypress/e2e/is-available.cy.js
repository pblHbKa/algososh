import { APP_ADDRESS } from "../utils/constants";

describe('приложение работоспособно', function() {
    it('страница есть на сервере', function() {
      cy.visit('');
      cy.contains('МБОУ АЛГОСОШ');
    });

    it('должна быть доступна страница разворота строки', function() {
      cy.visit('recursion');
      cy.contains('Строка');
    });

    it('должна быть доступна страница последовательности Фибоначчи', function() {
      cy.visit('fibonacci');
      cy.contains('Последовательность Фибоначчи');
    });

    it('должна быть доступна страница сортировок', function() {
      cy.visit('sorting');
      cy.contains('Сортировка массива');
    });

    it('должна быть доступна страница стека', function() {
      cy.visit('stack');
      cy.contains('Стек');
    });

    it('должна быть доступна страница очереди', function() {
      cy.visit('queue');
      cy.contains('Очередь');
    });

    it('должна быть доступна страница списка', function() {
      cy.visit('list');
      cy.contains('Связный список');
    });
  }); 