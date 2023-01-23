//selectors
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const quoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

//global vars
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//show new quote
function newQuote() {
  showLoadingSpinner();
  //pick a random quote from api quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // check if author field is null and replace with "unknown"
  if (!quote.author) {
    author.textContent = "Unknown";
  } else {
    author.textContent = quote.author;
  }
  // check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote, hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// get quotes from api
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    //this const will not be populated until it has some data fetched from the api (if an async/await was not used, the browser would try to set the response value before it had a chance to fetch -- this would caus an error. set the response variable when we actually have data to fetch or else it would just be undefined)
    const response = await fetch(apiUrl);
    //getting the json from the api as response and turning that response into a json object then we are passing that into a global var called api quotes created above -- this will mean it we be available to all functions and not just this function
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error here
    alert("oops, something went wrong");
  }
}

//tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//event listeners
quoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load (getQuotes function will run as soon as page loads)
getQuotes();
