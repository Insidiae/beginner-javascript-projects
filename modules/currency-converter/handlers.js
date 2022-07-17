import { fromInput, fromSelect, toSelect, toAmount } from "./elements.js";
import { formatCurrency } from "./utils.js";
import { convert } from "./lib.js";

export async function handleInput() {
  const rawAmount = await convert(fromInput.value, fromSelect.value, toSelect.value);

  toAmount.textContent = formatCurrency(rawAmount, toSelect.value);
}
