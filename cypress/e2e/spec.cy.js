describe('Interfaz de Casa de Cambio', () => {

  beforeEach(() => {
    // Visita la página local donde tienes tu aplicación
    cy.visit('index.html'); // Cambia esta URL según el puerto donde esté tu servidor local
  });

  it('Debe cargar la página y mostrar los elementos principales', () => {
    cy.get('h1').should('contain', 'Casa de Cambio');
    cy.get('#dateInput').should('exist');
    cy.get('#currencyDropdown').should('exist');
    cy.get('#fetchRatesButton').should('exist');
    cy.get('#themeToggle').should('exist');
  });

  it('Debe alternar el tema oscuro al hacer clic en el botón de tema', () => {
    cy.get('#themeToggle').click();
    cy.get('body').should('have.class', 'dark-theme');
    cy.get('#themeToggle').should('contain', 'Modo Claro');

    cy.get('#themeToggle').click();
    cy.get('body').should('not.have.class', 'dark-theme');
    cy.get('#themeToggle').should('contain', 'Modo Oscuro');
  });

  it('Debe mostrar un mensaje de error si no se seleccionan fecha y moneda', () => {
    cy.get('#fetchRatesButton').click();
    cy.get('#exchangeRates').should('contain', 'Por favor, selecciona la fecha y la moneda base.');
  });

  it('Debe cargar las tasas de cambio cuando se eligen una fecha y moneda', () => {
    cy.get('#dateInput').type('2024-11-07');  // Fecha de prueba
    cy.get('#currencyDropdown').select('USD'); // Moneda de prueba
    cy.get('#fetchRatesButton').click();

    // Espera que las tasas de cambio se muestren
    cy.get('#exchangeRates').should('contain', 'Tasas de Cambio:');
  });

  it('Debe cargar las tasas de cambio para una fecha antigua', () => {
    const fechaAntigua = '2023-01-01'; // Cambia por una fecha válida de la que tengas datos
    cy.get('#dateInput').type(fechaAntigua);  // Fecha antigua de prueba
    cy.get('#currencyDropdown').select('USD'); // Moneda de prueba
    cy.get('#fetchRatesButton').click();

    // Verifica que las tasas de cambio se muestren para la fecha antigua
    cy.get('#exchangeRates').should('contain', 'Tasas de Cambio:');
    cy.get('#exchangeRates').should('contain', 'USD');  // Verifica que la moneda seleccionada aparezca
  });

});
