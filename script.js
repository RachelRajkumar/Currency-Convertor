const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');

// Load currency options
async function loadCurrencies() {
  const res = await fetch('https://open.er-api.com/v6/latest/USD');
  const data = await res.json();
  const currencies = Object.keys(data.rates);

  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });

  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

loadCurrencies();

async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (isNaN(amount)) {
    resultDiv.textContent = 'Please enter a valid amount';
    return;
  }

  const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
  const data = await res.json();
  const rate = data.rates[to];
  const converted = (amount * rate).toFixed(2);

  resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
}
