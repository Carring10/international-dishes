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
        var mealName = document.createElement("h3");
        var mealThumb = document.createElement("img");
        card.setAttribute("class", "card");
        mealName.textContent = data.meals[i].strMeal;
        mealThumb.src = data.meals[i].strMealThumb;
        mealThumb.height = 250;
        mealThumb.width = 250;
        mealThumb.className = "img-thumbnail m-3";
        mealThumb.textContent = data.meals[i].strMealThumb;

        card.append(mealName);
        card.append(mealThumb);
        card.setAttribute("id", data.meals[i].idMeal);
        cardContainer.appendChild(card);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
// getMealApi();

function getIngredients(element) {
  var mealId = element.id;
  console.log(element);
  var ingredientsUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;

  if (document.getElementById(mealId + "_ingredients") !== null) {
    return;
  }
  fetch(ingredientsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (ingredientsData) {
      console.log(ingredientsData);
      // Local storage.
      localStorage.setItem("savedMeals", JSON.stringify(ingredientsData));

      var meal = ingredientsData.meals[0];
      var measurementParent = document.createElement("div");
      measurementParent.id = mealId + "_ingredients";

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

      // measurementParent.innerHTML = "";
      for (let amount of measurement) {
        var measurementList = document.createElement("p");
        // Replace Measure with Ingredient.
        var matchingIngredientKey = amount.replace("Measure", "Ingredient");
        // Concatenate the measurement value to the newly replaced value of ingredient.
        measurementList.textContent = meal[amount] + " " + meal[matchingIngredientKey];

        measurementParent.append(measurementList);
        element.append(measurementParent);
      }
      measurementParent.append(instructionsH2);
      measurementParent.append(instructions);
    });
}

// Drop down.
if (select !== null) {
  select.addEventListener("change", function (event) {
    getMealApi(event.target.value);
  });
}

// event delegation
cardContainer.addEventListener("click", function (event) {
  if (
    event.target.matches(".card") ||
    event.target.matches(".img-thumbnail") ||
    event.target.matches("h3")
  ) {
    getIngredients(event.target.closest(".card"));
  }
});
// Recipe Page.
var recipePage = document.getElementById("recipe-page-button");
if (recipePage !== null) {
  recipePage.addEventListener("click", function () {
    window.location.href =
      "file:///C:/Users/carri/Bootcamp/Projects/international-dishes/recipe-index.html";
  });
}

function saveRecipe() {
  var recipeContainer = document.getElementById("recipe-container");

  var savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
  var meal = savedMeals.meals[0];
  var measurementParent = document.createElement("div");
  var ingredientsH2 = document.createElement("h2");
  var instructionsH2 = document.createElement("h2");
  var instructions = document.createElement("p");
  ingredientsH2.textContent = "Ingredients";
  instructionsH2.textContent = "Instructions";
  instructions.textContent = meal.strInstructions;
  recipeContainer.append(measurementParent);
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
    // Concatenate the measurement value to the newly replaced value of ingredient.
    measurementList.textContent = meal[amount] + " " + meal[matchingIngredientKey];
    console.log(savedMeals);

    // e.target.append(measurementParent);
    measurementParent.append(measurementList);
  }
  measurementParent.append(instructionsH2);
  measurementParent.append(instructions);
}

// saveRecipeButton.addEventListener("click", saveRecipe);
