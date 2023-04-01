describe('приложение работоспособно', function() {
    it('страница есть на localhost:3000', function() {
      cy.visit('http://localhost:3000');
      cy.contains('МБОУ АЛГОСОШ');
    });

    it('должна быть доступна страница разворота строки', function() {
      cy.visit('http://localhost:3000/recursion');
      cy.contains('Строка');
    });

    it('должна быть доступна страница последовательности Фибоначчи', function() {
      cy.visit('http://localhost:3000/fibonacci');
      cy.contains('Последовательность Фибоначчи');
    });

    it('должна быть доступна страница сортировок', function() {
      cy.visit('http://localhost:3000/sorting');
      cy.contains('Сортировка массива');
    });

    it('должна быть доступна страница стека', function() {
      cy.visit('http://localhost:3000/stack');
      cy.contains('Стек');
    });

    it('должна быть доступна страница очереди', function() {
      cy.visit('http://localhost:3000/queue');
      cy.contains('Очередь');
    });

    it('должна быть доступна страница списка', function() {
      cy.visit('http://localhost:3000/list');
      cy.contains('Связный список');
    });
  }); 