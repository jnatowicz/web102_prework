/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

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
    for (let i = 0; i < games.length; i++) {
        const game = games[i]

        // create a new div element, which will become the game card
        const game_card = document.createElement("div")

        // add the class game-card to the list
        game_card.classList.add("game-card")

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_card.innerHTML = `<img src="${game.img}" class="game-img">
        <b><br>${game.name}</b><br>
        <br>${game.description}<br>
        <br>Backers: ${game.backers}`

        // append the game to the games-container
        gamesContainer.appendChild(game_card)
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
console.log("Contribution cards: ", contributionsCard)

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers;
}, 0);
console.log(totalContributions)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce ( (acc, game) => {
    return acc + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const totalGames = GAMES_JSON.reduce( (acc, game) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = `${totalGames.toLocaleString('en-US')}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let listOfUnmetGames = GAMES_JSON.filter ((game) => {
        return game.goal > game.pledged;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnmetGames);
    console.log(listOfUnmetGames);
    return listOfUnmetGames;
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let listOfMetGames = GAMES_JSON.filter ((game) => {
        return game.goal <= game.pledged;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfMetGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly)
fundedBtn.addEventListener("click", filterFundedOnly)
allBtn.addEventListener("click", showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let numUnfunded = filterUnfundedOnly()
let numUnfundedCount = numUnfunded.length;
//Or could have it return length instead. Or could just redo it w/o using function.

// create a string that explains the number of unfunded games using the ternary operator
let gameStr = `A total of ${totalRaised.toLocaleString("en-US")} has been raised for ${totalGames} games. ${numUnfundedCount > 1 ? `Currently, ${numUnfundedCount} games remain unfunded.` : numUnfunded === 1 ? `Currently, ${numUnfundedCount} game remains unfunded.` : ""
}`;


// create a new DOM element containing the template string and append it to the description container
const new_p = document.createElement("p")
new_p.innerText = gameStr
descriptionContainer.append(new_p)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, rest] = sortedGames;
console.log([firstGame, secondGame, rest])
// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledgeGame = document.createElement("p");
topPledgeGame.innerHTML = firstGame.name;
firstGameContainer.append(topPledgeGame);
// do the same for the runner up item
const runnerUpPledgeGame = document.createElement("p");
runnerUpPledgeGame.innerHTML = secondGame.name;
secondGameContainer.append(runnerUpPledgeGame);