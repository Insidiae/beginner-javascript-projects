const form = document.querySelector(".app form");
const fromInput = document.querySelector(`input[name="from_amount"]`);
const fromSelect = document.querySelector(`select[name="from_currency"]`);
const toSelect = document.querySelector(`select[name="to_currency"]`);
const toAmount = document.querySelector(".to_amount");

const endpoint = "https://api.exchangerate.host/latest";
const ratesByBase = {};

const currencies = {
  USD: "United States Dollar",
  AUD: "Australian Dollar",
  BGN: "Bulgarian Lev",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  CZK: "Czech Republic Koruna",
  DKK: "Danish Krone",
  GBP: "British Pound Sterling",
  HKD: "Hong Kong Dollar",
  HRK: "Croatian Kuna",
  HUF: "Hungarian Forint",
  IDR: "Indonesian Rupiah",
  ILS: "Israeli New Sheqel",
  INR: "Indian Rupee",
  JPY: "Japanese Yen",
  KRW: "South Korean Won",
  MXN: "Mexican Peso",
  MYR: "Malaysian Ringgit",
  NOK: "Norwegian Krone",
  NZD: "New Zealand Dollar",
  PHP: "Philippine Peso",
  PLN: "Polish Zloty",
  RON: "Romanian Leu",
  RUB: "Russian Ruble",
  SEK: "Swedish Krona",
  SGD: "Singapore Dollar",
  THB: "Thai Baht",
  TRY: "Turkish Lira",
  ZAR: "South African Rand",
  EUR: "Euro",
};

function generateOptions(options) {
  return Object.entries(options)
    .map(([currencyCode, currencyName]) => `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`)
    .join("");
}

async function fetchRates(base = "USD") {
  const res = await fetch(`${endpoint}?base=${base}`);
  const data = await res.json();

  return data;
}

async function convert(amount, from, to) {
  if (!ratesByBase[from]) {
    ratesByBase[from] = await fetchRates(from);
  }

  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  return convertedAmount;
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

async function handleInput() {
  const rawAmount = await convert(fromInput.value, fromSelect.value, toSelect.value);

  toAmount.textContent = formatCurrency(rawAmount, toSelect.value);
}

const optionsHTML = generateOptions(currencies);
fromSelect.innerHTML = optionsHTML;
toSelect.innerHTML = optionsHTML;

form.addEventListener("input", handleInput);
