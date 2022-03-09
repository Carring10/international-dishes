var resultsContainer = document.getElementById("search-results-container");
var cardContainer = document.getElementById("card-container");

function getMealApi() {
  // API URL for specified country.
  var countryUrl =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican";

  fetch(countryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < 5; i++) {
        // card HTML for recipes
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        var mealThumb = document.createElement("img");
        mealThumb.src = data.meals[i].strMealThumb;
        mealThumb.width = 250;
        var mealName = document.createElement("h3");
        mealName.textContent = data.meals[i].strMeal;
        mealThumb.textContent = data.meals[i].strMealThumb;
        cardContainer.appendChild(card);
        card.append(mealName);
        card.append(mealThumb);
        card.setAttribute("id", data.meals[i].idMeal);
        console.log(data.meals[i].strMeal);
        // card.append(btn);

        card.addEventListener("click", getIngredients);
      }
    });
}
getMealApi();

function getIngredients(e) {
  var ingredientsUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  console.log(e.target.id);
}

// LEAFLET MAP
var map = L.map("map").setView([51.505, -0.09], 13);
var attribution = __; // For copywrite.
var titleUrl = __;
var tileLayer = __;
var apiUrl = __;
