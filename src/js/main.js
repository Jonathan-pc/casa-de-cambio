const apiKey = "72cd1b07f77aae36b0afe230";
const baseUrl = "https://v6.exchangerate-api.com/v6";
const selectedCurrencies = ["AUD", "ATS", "BEF", "BRL", "CAD", "CHF", "CNY", "DEM", "DKK", "ESP", "EUR", "FIM", "FRF", "GBP", "GRD", "HKD", "IEP", "INR", "IRR", "ITL", "JPY", "KRW", "LKR", "MXN", "MYR", "NOK", "NLG", "NZD", "PTE", "SEK", "SGD", "THB", "TWD", "USD", "ZAR"];

document.addEventListener("DOMContentLoaded", () => {
  populateCurrencyDropdown();

  const fetchRatesButton = document.getElementById("fetchRatesButton");
  if (fetchRatesButton) {
    fetchRatesButton.addEventListener("click", async () => {
      const dateInput = document.getElementById("dateInput").value;
      const baseCurrency = document.getElementById("currencyDropdown").value;
      
      if (dateInput && baseCurrency) {
        const rates = await fetchExchangeRates(dateInput, baseCurrency);
        if (rates) {
          displayExchangeRates(rates);
        }
      } else {
        document.getElementById("exchangeRates").innerHTML = '<div class="text-danger">Por favor, selecciona la fecha y la moneda base.</div>';
      }
    });
  }
});

async function fetchExchangeRates(date, baseCurrency) {
  const apiUrl = `${baseUrl}/${apiKey}/latest/${baseCurrency}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error en la API: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.result === "success") {
      return { base: baseCurrency, rates: data.conversion_rates };
    } else {
      throw new Error("Error al obtener las tasas de cambio.");
    }
  } catch (error) {
    console.error("Error al hacer la solicitud:", error);
    document.getElementById("exchangeRates").innerHTML = `<div class="text-danger">Error al obtener las tasas de cambio: ${error.message}</div>`;
  }
}

function displayExchangeRates({ base, rates }) {
  const exchangeRatesDiv = document.getElementById("exchangeRates");
  exchangeRatesDiv.innerHTML = `<h5>Tasas de Cambio para ${base}:</h5>`;
  
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

  exchangeRatesDiv.appendChild(ratesList);
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

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const themeToggle = document.getElementById("themeToggle");
  themeToggle.textContent = document.body.classList.contains("dark-theme") ? "Modo Claro" : "Modo Oscuro";
});
