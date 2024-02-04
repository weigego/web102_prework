/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (var game of games) {
    // create a new div element, which will become the game card
    const div = document.createElement("div");
    // add the class game-card to the list
    div.classList.add("game-card");
    // set the inner HTML using a template literal to display some info
    // about each game
    div.innerHTML = `<img src=${game.img} class = "game-img" > <span>name: ${game.name}</span> <span>name: ${game.description}</span>`;
    // append the game to the games-container
    gamesContainer.append(div);
  }
  // TIP: if your images are not displaying, make sure there is space
  // between the end of the src attribute and the end of the tag ("/>")
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);
/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// console.log(GAMES_JSON);
const total_contributions = GAMES_JSON.reduce((acc, game) => {
  return acc + game.backers;
}, 0);
// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<span>${total_contributions.toLocaleString(
  "en-US"
)} </span>`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const total_money = GAMES_JSON.reduce((acc, game) => {
  return acc + game.pledged;
}, 0);
// set inner HTML using template literal
raisedCard.innerHTML = `<span>$${total_money.toLocaleString("en-US")}</span>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const total_games = GAMES_JSON.reduce((acc, game) => {
  return acc + 1;
}, 0);
gamesCard.innerHTML = `<span>${total_games.toLocaleString("en-US")} </span>`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  let list_unfundedGames = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
  });
  console.log(list_unfundedGames.length);
  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(list_unfundedGames);
}

filterUnfundedOnly();
// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  let list_fundedGames = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
  });
  console.log(list_fundedGames.length);
  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(list_fundedGames);
}
filterFundedOnly();
// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}
showAllGames();
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
// add event listeners with the correct functions to each button

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let list_unfundedGames = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
});
const total_unfoundedGames = list_unfundedGames.reduce((acc, game) => {
  return acc + 1;
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const displayStr = `A total of ${total_money.toLocaleString(
  "en-US"
)} has been raised for ${total_games} games. Currently, ${total_unfoundedGames} ${
  total_unfoundedGames > 1 ? "games remain" : "game remains"
} unfunded. We need your help to fund these amazing games!`;

// console.log(displayStr);
// create a new DOM element containing the template string and append it to the description container
const p = document.createElement("p");
// add the class game-card to the list
p.append(displayStr);
descriptionContainer.append(p);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame, ...others] = sortedGames;
console.log(firstGame, secondGame);
// create a new element to hold the name of the top pledge game, then append it to the correct element
const span_top = document.createElement("span");
span_top.append(firstGame.name);
firstGameContainer.append(span_top);
// do the same for the runner up item
const span_second = document.createElement("span");
span_second.append(secondGame.name);
secondGameContainer.append(span_second);
