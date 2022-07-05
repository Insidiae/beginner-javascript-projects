const toppings = [
  "Mushrooms",
  "Tomatoes",
  "Eggs",
  "Chili",
  "Lettuce",
  "Avocado",
  "Chiles",
  "Bacon",
  "Pickles",
  "Onions",
  "Cheese",
];

const buns = ["egg", "wonder", "brioche"];

const meats = {
  beyond: 10,
  beef: 5,
  pork: 7,
};

const prices = {
  hotDog: 453,
  burger: 765,
  sausage: 634,
  corn: 234,
};

const orderTotals = [342, 1002, 523, 34, 634, 854, 1644, 2222];

const feedback = [
  { comment: "Love the burgs", rating: 4 },
  { comment: "Horrible Service", rating: 2 },
  { comment: "Smoothies are great, liked the burger too", rating: 5 },
  { comment: "Ambiance needs work", rating: 3 },
  { comment: "I DONT LIKE BURGERS", rating: 1 },
];

// #region Static Methods
//* Static Methods - START
console.groupCollapsed("Static Methods");
//? Array.of()
console.group("Array.of()");
console.log(Array.of("wes", "kait"));
console.log(Array.of(..."wes"));
console.groupEnd();

//? Make a function that creates a range from x to y with Array.from()
console.group("Make a function that creates a range from 3 to 7 with Array.from()");
function createRange(start, end) {
  const range = Array.from({ length: end - start + 1 }, (item, index) => index + start);
  return range;
}

const myRange = createRange(3, 7);
console.log(myRange);
console.groupEnd();

//? Check if the last array you created is really an array with Array.isArray()
console.group("Check if the last array you created is really an array with Array.isArray()");
console.log(Array.isArray(myRange));
console.groupEnd();

//? Take the meats object and make three arrays with Object.entries(), Object.keys, Object.values()
console.log({ meats });
console.group("Take the meats object and make three arrays with:");

console.group("Object.entries()");
console.log(Object.entries(meats));
console.groupEnd();
console.group("Object.keys()");
console.log(Object.keys(meats));
console.groupEnd();
console.group("Object.values()");
console.log(Object.values(meats));
console.groupEnd();

console.groupEnd();

//* Static Methods - END
console.groupEnd();
// #endregion Static Methods

// #region Instance Methods
//* Instance Methods - START
console.groupCollapsed("Instance Methods");

//? Display all bun types with " or " - use join()
console.log({ buns });
console.group(`Display all bun types with " or " - use join()`);
console.log(buns.join(" or "));
console.groupEnd();

//? We have a string "hot dogs,hamburgers,sausages,corn" - use split() to turn it into an array
console.group(`We have a string "hot dogs,hamburgers,sausages,corn" - use split() to turn it into an array`);
console.log("hot dogs,hamburgers,sausages,corn".split(","));
console.groupEnd();

console.log({ toppings });
//? take the last item off toppings with pop()
console.group("take the last item off toppings with pop()");
const lastTopping = toppings.pop();
console.log(lastTopping);
console.log(toppings);
console.groupEnd();
//? add it back with push()
console.group("add it back with push()");
toppings.push(lastTopping);
console.log(toppings);
console.groupEnd();
//? take the first item off toppings with shift()
console.group("take the first item off toppings with shift()");
const firstTopping = toppings.shift();
console.log(firstTopping);
console.log(toppings);
console.groupEnd();
//? add it back in with unshift()
console.group("add it back in with unshift()");
toppings.unshift(firstTopping);
console.log(toppings);
console.groupEnd();
//? Do the last four,but immutable (with spreads and new variables)
console.groupCollapsed("Do the last four,but immutable (with spreads and new variables)");

// take the last item off toppings
console.group("take the last item off toppings");
const toppingsWithoutLast = toppings.slice(0, toppings.length - 1);
const lastToppingImmutable = toppings[toppings.length - 1];
console.log(lastToppingImmutable);
console.log(toppingsWithoutLast);
console.groupEnd();
// add it back
console.group("add it back");
console.log([...toppingsWithoutLast, lastToppingImmutable]);
console.groupEnd();
// take the first item off toppings
console.group("take the first item off toppings");
const [firstToppingImmutable, ...toppingsWithoutFirst] = toppings;
console.log(firstToppingImmutable);
console.log(toppingsWithoutFirst);
console.groupEnd();
// add it back in
console.group("add it back in");
console.log([firstToppingImmutable, ...toppingsWithoutFirst]);
console.groupEnd();

console.groupEnd();

//? Make a copy of the toppings array with slice()
console.group("Make a copy of the toppings array with slice()");
console.log(toppings.slice());
console.groupEnd();
//? Make a copy of the toppings array with a spread
console.group("Make a copy of the toppings array with a spread");
console.log([...toppings]);
console.groupEnd();
//? take out items 3 to 5 of your new toppings array with splice()
const newToppings = [...toppings];
console.group("take out items 3 to 5 of your new toppings array with splice()");
console.log(newToppings.splice(3, 3));
console.log(newToppings);
console.groupEnd();
//? find the index of Avocado with indexOf() / lastIndexOf()
console.group("find the index of Avocado with indexOf() / lastIndexOf()");
console.log(toppings.indexOf("Avocado"));
console.groupEnd();
//? Check if hot sauce is in the toppings with includes()
console.group("Check if hot sauce is in the toppings with includes()");
console.log(toppings.includes("hot sauce"));
console.groupEnd();
//? add it if it's not
console.group("add it if it's not");
const toppingsWithHotSauce = toppings.includes("hot sauce") ? toppings : [...toppings, "hot sauce"];
console.log(toppingsWithHotSauce);
console.groupEnd();
//? flip those toppings around with reverse()
console.group("flip those toppings around with reverse()");
console.log([...toppingsWithHotSauce].reverse());
console.groupEnd();

//* Instance Methods - END
console.groupEnd();
// #endregion Instance Methods

// #region Callback Methods
//* Callback Methods - START
console.groupCollapsed("Callback Methods and Function Generation");
console.log({ feedback });
//? find the first rating that talks about a burger with find()
console.group("find the first rating that talks about a burger with find()");
console.log(feedback.find((singleFeedback) => singleFeedback.comment.includes("burg")));
console.groupEnd();
//? find all ratings that are above 2 with filter()
console.group("find all ratings that are above 2 with filter()");
console.table(feedback.filter((singleFeedback) => singleFeedback.rating > 2));
console.groupEnd();
//? find all ratings that talk about a burger with filter()
console.group("find all ratings that talk about a burger with filter()");
// console.table(feedback.filter((singleFeedback) => singleFeedback.comment.includes("burg")));
// or, use regex to ignore uppercase/lowercase letters:
console.table(feedback.filter((singleFeedback) => /burg/i.test(singleFeedback.comment)));
console.groupEnd();
//? Remove the one star rating however you like!
console.group("Remove the one star rating however you like!");
console.table(feedback.filter((singleFeedback) => singleFeedback.rating > 1));
console.groupEnd();

console.log({ meats });
//? check if there is at least 5 of one type of meat with some()
console.group("check if there is at least 5 of one type of meat with some()");
console.log(Object.entries(meats).some(([meat, amount]) => amount >= 5));
console.groupEnd();
//? make sure we have at least 3 of every meat with every()
console.group("make sure we have at least 3 of every meat with every()");
console.log(Object.entries(meats).every(([meat, amount]) => amount >= 3));
console.groupEnd();
//? sort the toppings alphabetically with sort()
console.group("sort the toppings alphabetically with sort()");
console.log([...toppings].sort());
console.groupEnd();
//? sort the order totals from most expensive to least with .sort()
console.group("sort the order totals from most expensive to least with .sort()");
console.log([...orderTotals].sort((prevOrder, nextOrder) => nextOrder - prevOrder));
console.groupEnd();
//? Sort the prices with sort()
console.group("Sort the prices with sort()");
console.table(
  Object.fromEntries(
    Object.entries(prices).sort(([prevOrder, prevPrice], [nextOrder, nextPrice]) => prevPrice - nextPrice),
  ),
);
console.groupEnd();

//* Callback Methods - END
console.groupEnd();
// #endregion Callback Methods

/*
  Looping Methods (next)
*/

/*
  eslint
    no-unused-vars: "off",
    no-console: "off",
*/
