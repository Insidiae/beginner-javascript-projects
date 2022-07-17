export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function generateOptions(options) {
  return Object.entries(options)
    .map(([currencyCode, currencyName]) => `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`)
    .join("");
}
