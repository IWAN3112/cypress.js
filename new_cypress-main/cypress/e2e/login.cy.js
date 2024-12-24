describe('Тестирование формы логина и пароля на login.qa.studio', () => {
    const baseUrl = 'https://login.qa.studio';
    const correctEmail = 'german@dolnikov.ru';
    const correctPassword = 'iLoveqastudio1';
  
    beforeEach(() => {
      cy.visit(baseUrl);
    });
  
    // 1. Позитивный кейс авторизации
    it('Позитивный кейс авторизации', () => {
      cy.get('#mail').type(correctEmail);
      cy.get('#pass').type(correctPassword);
      cy.get('#login-button').click();
      cy.contains('Авторизация прошла успешно');
      cy.get('.close-button').should('be.visible');
    });
  
    // 2. Проверка логики восстановления пароля
    it('Проверка логики восстановления пароля', () => {
      cy.contains('Забыли пароль').click();
      cy.get('#mail-for-pass').type('anyemail@example.com');
      cy.get('#restore-button').click();
      cy.contains('Письмо отправлено');
      cy.get('.close-button').should('be.visible');
    });
  
    // 3. Негативный кейс авторизации: неправильный пароль
    it('Негативный кейс авторизации с неправильным паролем', () => {
      cy.get('#mail').type(correctEmail);
      cy.get('#pass').type('WrongPassword');
      cy.get('#login-button').click();
      cy.contains('Неверный пароль');
      cy.get('.close-button').should('be.visible');
    });
  
    // 4. Негативный кейс авторизации: неправильный логин
    it('Негативный кейс авторизации с неправильным логином', () => {
      cy.get('#mail').type('wrongemail@example.com');
      cy.get('#pass').type(correctPassword);
      cy.get('#login-button').click();
      cy.contains('Пользователь не найден');
      cy.get('.close-button').should('be.visible');
    });
  
    // 5. Негативный кейс валидации: логин без @
    it('Негативный кейс валидации: логин без @', () => {
      cy.get('#mail').type('invalidEmail');
      cy.get('#pass').type(correctPassword);
      cy.get('#login-button').click();
      cy.contains('Введите корректный email');
    });
  
    // 6. Проверка приведения логина к строчным буквам
    it('Проверка приведения логина к строчным буквам', () => {
      cy.get('#mail').type('GerMan@Dolnikov.ru');
      cy.get('#pass').type(correctPassword);
      cy.get('#login-button').click();
      // Ожидаем успешную авторизацию, но тест упадёт из-за бага
      cy.contains('Авторизация прошла успешно');
      cy.get('.close-button').should('be.visible');
    });
  });
  