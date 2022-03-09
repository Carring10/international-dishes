var resultsContainer = document.getElementById("search-results-container");

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
        var mealName = document.createElement("h2");
        // Show ingredients button.
        var btn = document.createElement("button");
        mealName.textContent = data.meals[i].strMeal;
        btn.textContent = "ingredients";
        btn.setAttribute("id", data.meals[i].idMeal);
        console.log(data.meals[i].strMeal);
        resultsContainer.append(mealName);
        resultsContainer.append(btn);

        btn.addEventListener("click", getIngredients);
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
