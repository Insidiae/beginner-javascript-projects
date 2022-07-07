const shoppingForm = document.querySelector(`.shopping`);
const shoppingList = document.querySelector(`.list`);

//* We'll need an array to hold the state (aka our shopping list items)
let allItems = [];

function handleSubmit(event) {
  event.preventDefault();

  const name = event.currentTarget.item.value;
  if (!name) {
    return;
  }

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  allItems.push(item);

  event.currentTarget.reset();
  //? Fire off a custom event to signal our items being updated
  shoppingList.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function displayItems() {
  const html = allItems
    .map(
      (item) => `
        <li class="shopping-item">
          <input 
            type="checkbox"
            value="${item.id}"
            ${item.complete ? "checked" : ""}
          />
          <span className="itemName">${item.name}</span>
          <button
            aria-label="Remove ${item.name}"
            value="${item.id}"
          >
            &times;
          </button>
        </li>`,
    )
    .join("");

  shoppingList.innerHTML = html;
}

function saveToLocalStorage() {
  localStorage.setItem("items", JSON.stringify(allItems));
}

function restoreFromLocalStorage() {
  const savedItems = JSON.parse(localStorage.getItem("items"));
  if (savedItems.length) {
    allItems.push(...savedItems);
    shoppingList.dispatchEvent(new CustomEvent("itemsUpdated"));
  }
}

function deleteItem(id) {
  allItems = allItems.filter((item) => item.id !== id);
  shoppingList.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function markAsComplete(id) {
  const itemRef = allItems.find((item) => item.id === id);
  itemRef.complete = !itemRef.complete;
  shoppingList.dispatchEvent(new CustomEvent("itemsUpdated"));
}

function delegateEvents(event) {
  const id = parseInt(event.target.value);
  //? Delegate the delete event
  //? We listen for a click on the parent list,
  //? but we actually care about the individual button that was clicked
  if (event.target.matches("button")) {
    deleteItem(id);
  }
  //? Delegate the item complete toggle
  if (event.target.matches(`input[type="checkbox"]`)) {
    markAsComplete(id);
  }
}

shoppingForm.addEventListener("submit", handleSubmit);
shoppingList.addEventListener("itemsUpdated", displayItems);
shoppingList.addEventListener("itemsUpdated", saveToLocalStorage);
shoppingList.addEventListener("click", delegateEvents);
window.addEventListener("load", restoreFromLocalStorage);
