/*I. Update Market Value. Market Value = Shares Owned * Market Price*/
//II. Update Unrealised Profits. Unrealised profits = market Value - cost of purchase
//III. Use each() to print each value on screen
//IV. Calculate total portfolio value and profit
//V.Add Javascript to remove button
//VI. Make Shae, Cost, & Market Price editable
//VII. Attach event handler to value change on inputs
//VIII. Add new row to the list

// get shars owned and market price
//wrap it inside ready func: script file is loaded before the HTML body element
const updateMarketValue = function (element) {
  //get shares Owned & market price by looping through tr
  //tr.children(.targetClass).text-> retreive text of that child element
  //parsefloart: return string into a floating number
  //val: retrieve value from input
  //find(): look for nested children elements
  const sharesOwned = parseFloat($(element).find(".shares input").val());
  const marketPrice = parseFloat($(element).find(".marketPrice input").val());

  //market value = shares Owned * market price per share
  const marketValue = sharesOwned * marketPrice;

  //inject market value back to html file
  //html(): edit the text of that element
  $(element).children(".marketValue").html(marketValue);

  return marketValue;
};

const updateUnrealizedProfit = function (element, marketValue) {
  const sharesOwned = parseFloat($(element).find(".shares input").val());
  const costPerShare = parseFloat($(element).find(".cost input").val());
  const costOfPurchase = sharesOwned * costPerShare;

  //unrealised profit = marketValue - costOfPurchase
  const unrealisedProfit = marketValue - costOfPurchase;
  $(element).children(".profit").html(unrealisedProfit);

  return unrealisedProfit;
};

const sum = function (account, x) {
  return account + x;
};

var updatePortfolioValueAndProfit = function () {
  //updateMarkektValue() & updateUnrealisedProfit() already return individuals
  //store themm in arrays and sum them up
  const stocksMarketValue = [];
  const stocksUnrealizedProfits = [];

  //use each loop to print each individual value of market value and unrealised gain/loss on screen
  $("tbody tr").each(function (index, element) {
    const marketValue = updateMarketValue(element);

    //add individual value to stocks market value to get the sum for portfolio value
    stocksMarketValue.push(marketValue);

    const unrealizedProfit = updateUnrealizedProfit(element, marketValue);
    stocksUnrealizedProfits.push(unrealizedProfit);
  });

  //The reduce() method returns a single value: the function's accumulated result.
  const portfolioMarketValue = stocksMarketValue.reduce(sum);
  const portfolioUnrealizedProfit = stocksUnrealizedProfits.reduce(sum);

  //inject the value in span
  $("#portfolioValue").html(portfolioMarketValue);
  $("#portfolioProfit").html(portfolioUnrealizedProfit);
};

//ufire as soon as DOM becomes safe to manipulate
$(document).ready(function () {
  updatePortfolioValueAndProfit();

  $(document).on("click", ".btn.remove", function (event) {
    //closest: finds the closest parent element that matches the CSS selector 'tr'
    //remove(): remove selected element from DOM
    $(this).closest("tr").remove();
    // = $(this).parent().parent().remove();
    updatePortfolioValueAndProfit();
  });

  //Use event listener change input to trigger an update
  //.on(): fired synchronously as the value of an input element changes.
    $(document).on("input", "tr input", function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updatePortfolioValueAndProfit();
    }, 1000);
  });

  //get all of the new values
  $("#addStock").on("submit", function (event) {
    event.preventDefault();
    var name = $(this).children("[name=name]").val();

    var shares = $(this).children("[name=shares]").val();

    var cost = $(this).children("[name=cost]").val();

    var marketPrice = $(this).children("[name=marketPrice]").val();

    $("tbody").append(
      "<tr>" +
        '<td class="name">' +
        name +
        "</td>" +
        '<td class="shares"><input type="number" value="' +
        shares +
        '" /></td>' +
        '<td class="cost"><input type="number" value="' +
        cost +
        '" /></td>' +
        '<td class="marketPrice"><input type="number" value="' +
        marketPrice +
        '" /></td>' +
        '<td class="marketValue"></td>' +
        '<td class="profit"></td>' +
        '<td><button class="btn btn-dark btn-sm remove">remove</button></td>' +
        "</tr>"
    );

    updatePortfolioValueAndProfit();
    $(this).children("[name=name]").val("");
    $(this).children("[name=shares]").val("");
    $(this).children("[name=cost]").val("");
    $(this).children("[name=marketPrice]").val("");
  });
});

//updatePortfolioValueAndProfit is a big function: loop and manupilate DOM
//when portfolio getslonger, update function will start to be sluggish -> use a debounce
//debounce: make sure time-consuming tasks do not fire so often -> improve performance of the web page

//call the update when a certain period has passed after the user stopped typing
var timeout;
$("tr input").on("input", function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    updatePortfolioValueAndProfit();
  }, 1000); // delay 1s ->update wouldn't be executed until 1 second after the user has stopped typing
  //when new change is made -> timeout for another 1 sec& old one is destroyed
});
