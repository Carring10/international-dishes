var resultsContainer = document.getElementById("search-results-container");
var cardContainer = document.getElementById("card-container");
var select = document.getElementById("ethnicity");
// var selectValue = select.options[select.selectedIndex].value;

function getMealApi(option) {
  // API URL for specified country.
  var countryUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + option;
  console.log(option);

  fetch(countryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      cardContainer.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        // card HTML for recipes
        var card = document.createElement("div");
        card.setAttribute("class", "card");
        var mealThumb = document.createElement("img");
        mealThumb.src = data.meals[i].strMealThumb;
        mealThumb.height = 250;
        mealThumb.className = "img-thumbnail m-3";
        var mealName = document.createElement("h3");
        mealName.textContent = data.meals[i].strMeal;
        mealThumb.textContent = data.meals[i].strMealThumb;
        cardContainer.appendChild(card);
        card.append(mealName);
        card.append(mealThumb);
        card.setAttribute("id", data.meals[i].idMeal);
        // card.append(btn);

        card.addEventListener("click", getIngredients);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
// getMealApi();

function getIngredients(e) {
  var mealId = e.target.id;
  console.log(e);
  var ingredientsUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;

  fetch(ingredientsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (ingredientsData) {
      console.log(ingredientsData);

      var meal = ingredientsData.meals[0];
      var measurementParent = document.createElement("div");
      var ingredientsH2 = document.createElement("h2");
      var instructionsH2 = document.createElement("h2");
      var instructions = document.createElement("p");
      ingredientsH2.textContent = "Ingredients";
      instructionsH2.textContent = "Instructions";
      instructions.textContent = meal.strInstructions;
      measurementParent.append(ingredientsH2);

      // Filter all keys with the name 'Measure' that has a value.
      var measurement = Object.keys(meal).filter(
        (key) => key.includes("Measure") && meal[key] && meal[key].length
      );
      console.log(measurement);
      for (let amount of measurement) {
        var measurementList = document.createElement("p");
        // Replace Measure with Ingredient.
        var matchingIngredientKey = amount.replace("Measure", "Ingredient");
        console.log(matchingIngredientKey);
        // Concatenate the measurement value to the newly replaced value of ingredient.
        measurementList.textContent = meal[amount] + " " + meal[matchingIngredientKey];
        console.log(meal[matchingIngredientKey]);

        e.target.append(measurementParent);
        measurementParent.append(measurementList);
      }
      measurementParent.append(instructionsH2);
      measurementParent.append(instructions);
    });
}

// Drop down.
select.addEventListener("change", function (event) {
  getMealApi(event.target.value);
});

//getIngredients();

// LEAFLET MAP
// var map = L.map("map").setView([51.505, -0.09], 13);
// var attribution = __; // For copywrite.
// var titleUrl = __;
// var tileLayer = __;
// var apiUrl = __;
