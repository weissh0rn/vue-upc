// cypress/e2e/app.cy.js
describe('Ukraine Population Calculator App', () => {
  const username = 'testuser';
  const password = 'password';

  // Функція для реєстрації користувача
  function registerUser(username, password) {
    cy.visit('/register');
    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('#confirm-password').clear().type(password);
    cy.get('form').submit();
    cy.url().should('include', '/login');
  }

  // Функція для логіна
  function loginUser(username, password) {
    cy.visit('/login');
    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('form').submit();
    cy.url().should('include', '/home');
  }

  beforeEach(() => {
    // Очистити локальне сховище перед кожним тестом
    cy.clearLocalStorage();
    // Переконатися, що ми на стартовій сторінці
    cy.visit('/');
  });

  it('should display the correct title on the home page', () => {
    cy.get('.header-app-title').should('contain', 'Ukraine Population Calculator');
  });

  it('should navigate to the About page when R&D^2 button is clicked', () => {
    cy.get('.about-link .btn').click();
    cy.url().should('include', '/about');
    cy.contains('Developer: Viacheslav Us KV-32mp').should('exist');
  });

  it('should navigate back to the login page when Back button is clicked on the About page', () => {
    // click R&D^2 button
    cy.get('.about-link .btn').click();
    cy.url().should('include', '/about');
    // click Back button
    cy.get('.logout-button').click();
    cy.url().should('include', '/login');
  });

  it('should display an error message when both username and password are not filled', () => {
    cy.visit('/login');
    cy.get('form').submit();
    // Check, browser send "Please fill out this field"
    cy.get('#username:invalid').should('exist');
    cy.get('#password:invalid').should('exist');
    cy.url().should('include', '/login');
  });

  it('should allow a user to register', () => {
    registerUser(username, password);
  });

  it('should display an error message for invalid user login', () => {
    cy.visit('/login');
    cy.get('#username').clear().type('testuser_wrong');
    cy.get('#password').clear().type(password);
    cy.get('form').submit();
    cy.get('.error').should('contain', 'Invalid username or password');
    cy.url().should('include', '/login');
  });

  it('should display an error message for invalid password login', () => {
    registerUser(username, password);
    cy.visit('/login');
    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type('password_wrong');
    cy.get('form').submit();
    cy.get('.error').should('contain', 'Invalid username or password');
    cy.url().should('include', '/login');
  });

  it('should login with correct user and password', () => {
    registerUser(username, password);
    loginUser(username, password);
  });

  it('should display population summary correctly', () => {
    registerUser(username, password);
    loginUser(username, password);

    // Взаємодія з v-select елементами
    cy.get('.left-panel').within(() => {
      cy.get('#city-select').click().type('Хмельницький{enter}');
      cy.get('#city-select').click().type('Дніпро{enter}');
      cy.get('#region-select').click().type('Волинська область{enter}');
      cy.get('#age-from-select').click().type('20{enter}');
      cy.get('#age-to-select').click().type('20{enter}');
      cy.get('#type-select').click().type('Загальне населення{enter}');
      cy.get('#sex-select').click().type('Обидві статі{enter}');
    });

    cy.get('.left-panel').within(() => {
      cy.get('.summary-table').should('exist');
      // Перевірка значень у таблиці
      cy.get('.summary-table tbody tr').eq(0).within(() => {
        cy.get('td').eq(0).should('contain', 'Стать');
        cy.get('td').eq(1).should('contain', 'Разом');
      });
      cy.get('.summary-table tbody tr').eq(1).within(() => {
        cy.get('td').eq(0).should('contain', 'Міста');
        cy.get('td').eq(1).should('contain', '10717');
      });
      cy.get('.summary-table tbody tr').eq(2).within(() => {
        cy.get('td').eq(0).should('contain', 'Регіони');
        cy.get('td').eq(1).should('contain', '1929');
      });
      cy.get('.summary-table tbody tr').eq(3).within(() => {
        cy.get('td').eq(0).should('contain', 'Загальне');
        cy.get('td').eq(1).should('contain', '12646');
      });

    });

  });

  it('should clear all fields when Clear button is clicked', () => {
    registerUser(username, password);
    loginUser(username, password);

    cy.get('.left-panel').within(() => {
      cy.get('#city-select').click().type('Хмельницький{enter}');
      cy.get('#age-from-select').click().type('20{enter}');
      cy.get('#age-to-select').click().type('30{enter}');
      cy.get('#type-select').click().type('Загальне населення{enter}');
      cy.get('#sex-select').click().type('Обидві статі{enter}');
    });

    cy.get('.clear-button').click();

    cy.get('.left-panel').within(() => {
      cy.get('#city-select .vs__selected-options').should('not.contain', 'Хмельницький');
      cy.get('#age-from-select .vs__selected-options').should('not.contain', '20');
      cy.get('#age-to-select .vs__selected-options').should('not.contain', '30');
      cy.get('#type-select .vs__selected-options').should('not.contain', 'Загальне населення');
      cy.get('#sex-select .vs__selected-options').should('not.contain', 'Обидві статі');
    });
  });

  it('should allow a user to navigate to the profile page', () => {
    registerUser(username, password);
    loginUser(username, password);

    cy.get('.user-button').click();
    cy.url().should('include', '/user-profile');
    cy.get('.header-title').should('contain', 'user profile');
  });

  it('should allow a user to logout', () => {
    registerUser(username, password);
    loginUser(username, password);

    cy.get('.logout-button').click();
    cy.url().should('include', '/login');
  });
});

