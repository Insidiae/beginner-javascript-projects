const baseURL = "https://recipes.beginnerjavascript.com/api";
const proxy = `https://cors-anywhere.herokuapp.com/`;
const searchForm = document.querySelector("form.search");
const recipesGrid = document.querySelector(".recipes");

async function fetchRecipes(query) {
  const res = await fetch(`${proxy}${baseURL}?q=${query}`);
  const data = await res.json();

  return data.results;
}

function handleRecipesError() {
  recipesGrid.innerHTML = `
    <div class="error">
      <h2>There was an error handling your request</h2>
      <p>
        This project requires access to a CORS demo proxy server.
        <a href="https://cors-anywhere.herokuapp.com/corsdemo" target="_blank" rel="noopener noreferrer">
          Request access to the CORS demo proxy here.
        </a>
      </p>
    </div>
  `;
}

function displayRecipes(recipes) {
  const recipesHTML = recipes
    .map(
      (recipe) => `
        <div class="recipe">
          <h2>${recipe.title}</h2>
          ${recipe.thumbnail ? `<img src="${recipe.thumbnail}" alt="${recipe.title}" />` : ""}
          <p>${recipe.description}</p>
          <a href="${recipe.href}">View Recipe →</a>
        </div>
      `,
    )
    .join("");

  recipesGrid.innerHTML = recipesHTML;
}

async function fetchAndDisplay(query) {
  const recipes = await fetchRecipes(query).catch(handleRecipesError);
  displayRecipes(recipes);
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  //? Disable submit button while fetching
  form.submit.disabled = true;
  form.submit.textContent = "Loading...";

  await fetchAndDisplay(form.query.value);

  form.submit.disabled = false;
  form.submit.textContent = "Submit";
}

searchForm.addEventListener("submit", handleSubmit);

//? Display pizza recipes on page load
fetchAndDisplay("pizza");
