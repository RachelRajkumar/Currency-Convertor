const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');
const amountInput = document.getElementById('amount');

// Load currencies
async function loadCurrencies() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await res.json();

    const currencies = Object.keys(data.rates);

    currencies.forEach(currency => {
      let option1 = document.createElement('option');
      let option2 = document.createElement('option');

      option1.value = option2.value = currency;
      option1.textContent = option2.textContent = currency;

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = "USD";
    toCurrency.value = "INR";

  } catch (err) {
    resultDiv.textContent = "Failed to load currencies";
  }
}

loadCurrencies();

// Swap function
function swapCurrencies() {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
}

// Convert currency
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || amount <= 0) {
    resultDiv.textContent = "Enter valid amount";
    return;
  }

  if (from === to) {
    resultDiv.textContent = "Both currencies are same";
    return;
  }

  try {
    resultDiv.textContent = "Converting...";

    const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
    const data = await res.json();

    const rate = data.rates[to];
    const converted = (amount * rate).toLocaleString('en-IN', {
      maximumFractionDigits: 2
    });

    resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;

  } catch (err) {
    resultDiv.textContent = "Conversion failed";
  }
}