/*I. Update Market Value. Market Value = Shares Owned * Market Price*/
//II. Update Unrealised Profits. Unrealised profits = market Value - cost of purchase


  // get shars owned and market price
  //wrap it inside ready func: script file is loaded before the HTML body element
  const updateMarketValue = function (element) {
    //get shares Owned & market price by looping through tr
    //tr.children(.targetClass).text-> retreive text of that child element
    //parsefloart: return string into a floating number
    const sharesOwned = parseFloat($(element).children(".shares").text());
    const marketPrice = parseFloat($(element).children(".marketPrice").text());

    //market value = shares Owned * market price per share
    const marketValue = sharesOwned * marketPrice;

    //inject market value back to html file
    //html(): edit the text of that element
    $(element).children(".marketValue").html(marketValue);

    return marketValue;
    };
    

var updateUnrealizedProfit = function (element, marketValue) {
    const sharesOwned = parseFloat($(element).children(".shares").text());
    const costPerShare = parseFloat($(element).children(".cost").text());
    const costOfPurchase = sharesOwned * costPerShare;

    //unrealised profit = marketValue - costOfPurchase
    const unrealisedProfit = marketValue - costOfPurchase;
    $(element).children(".profit").html(unrealisedProfit);

    return unrealisedProfit;
};


//use ready func after the HTML is ready
$(document).ready(function () {
    //use each loop to print each individual value of market value and unrealised gain/loss on screen
    $('tbody tr').each(function (index, element) {
        const marketValue = updateMarketValue(element);
        updateUnrealizedProfit(element, marketValue);
    })
})


