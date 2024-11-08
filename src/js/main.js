const apiKey = "72cd1b07f77aae36b0afe230";
const baseUrl = "https://v6.exchangerate-api.com/v6";
const selectedCurrencies = ["AUD", "ATS", "BEF", "BRL", "CAD", "CHF", "CNY", "DEM", "DKK", "ESP", "EUR", "FIM", "FRF", "GBP", "GRD", "HKD", "IEP", "INR", "IRR", "ITL", "JPY", "KRW", "LKR", "MXN", "MYR", "NOK", "NLG", "NZD", "PTE", "SEK", "SGD", "THB", "TWD", "USD", "ZAR"];

document.addEventListener("DOMContentLoaded", () => {
  populateCurrencyDropdown();

  const fetchRatesButton = document.getElementById("fetchRatesButton");
  if (fetchRatesButton) {
    fetchRatesButton.addEventListener("click", fetchExchangeRates);
  }
});

async function fetchExchangeRates() {
  const dateInput = document.getElementById("dateInput").value;
  const currencyDropdown = document.getElementById("currencyDropdown");
  const baseCurrency = currencyDropdown ? currencyDropdown.value : null;
  const exchangeRatesDiv = document.getElementById("exchangeRates");

  if (!dateInput || !baseCurrency) {
    exchangeRatesDiv.innerHTML = '<div class="text-danger">Por favor, selecciona la fecha y la moneda base.</div>';
    return;
  }

  const apiUrl = `${baseUrl}/${apiKey}/latest/${baseCurrency}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.result === "success") {
      displayExchangeRates(data.conversion_rates, exchangeRatesDiv);
    } else {
      throw new Error("Error al obtener las tasas de cambio.");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    exchangeRatesDiv.innerHTML = `<div class="text-danger">Error al obtener las tasas de cambio: ${error.message}</div>`;
  }
}

function populateCurrencyDropdown() {
  const currencyDropdown = document.getElementById("currencyDropdown");
  if (currencyDropdown) {
    selectedCurrencies.forEach(currency => {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = currency;
      currencyDropdown.appendChild(option);
    });
  } else {
    console.error("El menú desplegable de monedas no se encontró en el DOM.");
  }
}

function displayExchangeRates(rates, container) {
  container.innerHTML = `<h5>Tasas de Cambio:</h5>`;
  const ratesList = document.createElement("ul");
  ratesList.className = "list-group";
  Object.entries(rates).forEach(([currency, rate]) => {
    if (selectedCurrencies.includes(currency)) {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.textContent = `${currency}: ${rate}`;
      ratesList.appendChild(listItem);
    }
  });
  container.appendChild(ratesList);
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const themeToggle = document.getElementById("themeToggle");
  if (document.body.classList.contains("dark-theme")) {
      themeToggle.textContent = "Modo Claro";
  } else {
      themeToggle.textContent = "Modo Oscuro";
  }

  document.querySelectorAll(".form-control, .form-select, .card").forEach(el => {
      el.classList.toggle("dark-theme");
  });
});
