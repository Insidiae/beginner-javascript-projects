// Make a div
const myDiv = document.createElement("div");

// add a class of wrapper to it
myDiv.classList.add("wrapper");

// put it into the body
document.body.appendChild(myDiv);

// make an unordered list
const myList = document.createElement("ul");

// add three list items with the words "one, two, three" in them
const li1 = document.createElement("li");
li1.textContent = "one";
const li2 = document.createElement("li");
li2.textContent = "two";
const li3 = li1.cloneNode(true);
li3.textContent = "three";

myList.appendChild(li1);
myList.appendChild(li2);
myList.appendChild(li3);

// put that list into the above wrapper
myDiv.appendChild(myList);

// create an image
const myImg = document.createElement("img");

// set the source to an image
// set the width to 250
const myImgWidth = 250;
myImg.src = `https://picsum.photos/${myImgWidth}`;
myImg.width = 250;
// add a class of cute
myImg.classList.add("cute");
// add an alt of Cute Puppy
myImg.alt = "Cute Puppy";
// Append that image to the wrapper
myDiv.appendChild(myImg);

// with HTML string, make a div, with two paragraphs inside of it
const myHTML = `
  <div>
    <p>I am a paragraph</p>
    <p>I am another paragraph</p>
  </div>
`;

// put this div before the unordered list from above
myList.insertAdjacentHTML("beforebegin", myHTML);

// add a class to the second paragraph called warning
const myDivFromString = myList.previousElementSibling;
const mySecondP = myDivFromString.querySelectorAll("p")[1];
mySecondP.classList.add("warning");
// remove the first paragraph
const myFirstP = myDivFromString.querySelectorAll("p")[0];
myFirstP.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height
function generatePlayerCard(name, age, height) {
  // have that function return html that looks like this:
  // <div class="playerCard">
  //   <h2>NAME — AGE</h2>
  //   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
  // </div>
  const ageInDogYears = age * 7;

  // Bonus, put a delete Button on each card so when you click it, the whole card is removed
  return `
    <div class="playerCard">
      <h2>${name} — ${age}</h2>
      <p>Their Height is ${height} cm and ${age} years old. In Dog years this person would be ${ageInDogYears}. That would be a tall dog!</p>
      <button>DELET THIS</button>
    </div>
  `;
}

// make a new div with a class of cards
const myCards = document.createElement("div");
myCards.classList.add("cards");

// make 4 player cards using generatePlayerCard
let myCardsHTML = "";
myCardsHTML += generatePlayerCard("Leonardo", 12, 150);
myCardsHTML += generatePlayerCard("Michaelangelo", 12, 150);
myCardsHTML += generatePlayerCard("Donatello", 12, 150);
myCardsHTML += generatePlayerCard("Raphael", 12, 150);

// append those cards to the div
myCards.innerHTML = myCardsHTML;
// put the div into the DOM just before the wrapper element
myDiv.insertAdjacentElement("beforebegin", myCards);

// select all the buttons!
const allCards = myCards.querySelectorAll(".playerCard");
// make out delete function
function deleteCard(idx) {
  allCards[idx].remove();
}
// loop over them and attach a listener
for (let i = 0; i < allCards.length; i += 1) {
  const deleteButton = allCards[i].querySelector("button");
  deleteButton.addEventListener("click", () => deleteCard(i));
}
