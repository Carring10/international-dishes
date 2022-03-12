var resultsContainer = document.getElementById("search-results-container");
var cardContainer = document.getElementById("card-container");
var select = document.getElementById("ethnicity");
var measurementParent = document.createElement("div");

function getMealApi(option) {
  // API URL for specified country.
  var countryUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + option;

  fetch(countryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      cardContainer.innerHTML = "";

      for (let i = 0; i < data.meals.length; i++) {
        // card HTML for recipes
        var card = document.createElement("div");
        var mealName = document.createElement("h3");
        var mealThumb = document.createElement("img");

        card.setAttribute("class", "card border-primary");
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
      // localStorage.setItem("savedMeals", JSON.stringify(ingredientsData));

      var meal = ingredientsData.meals[0];

      measurementParent.id = mealId + "_ingredients";

      var ingredientsH2 = document.createElement("h3");
      var instructionsH2 = document.createElement("h3");
      var instructions = document.createElement("p");
      var saveRecipeBtn = document.createElement("button");

      ingredientsH2.textContent = "Ingredients";
      instructionsH2.textContent = "Instructions";
      instructions.textContent = meal.strInstructions;
      saveRecipeBtn.textContent = "Save Recipe";
      measurementParent.innerHTML = "";
      measurementParent.append(ingredientsH2);

      // Filter all keys with the name 'Measure' that has a value.
      var measurement = Object.keys(meal).filter(
        (key) => key.includes("Measure") && meal[key] && meal[key].length
      );

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
      measurementParent.append(saveRecipeBtn);

      saveRecipeBtn.addEventListener("click", function (event) {
        localStorage.setItem("savedMeals", JSON.stringify(ingredientsData));
        event.stopPropagation();
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Drop down.
if (select !== null) {
  select.addEventListener("change", function (event) {
    getMealApi(event.target.value);
  });
}

// event delegation
if (cardContainer !== null) {
  cardContainer.addEventListener("click", function (event) {
    if (
      event.target.matches(".card") ||
      event.target.matches(".img-thumbnail") ||
      event.target.matches("h3")
    ) {
      getIngredients(event.target.closest(".card"));
    }
  });
}

// Recipe Page.
var recipePage = document.getElementById("recipe-page-button");

// To change file path to recipe page.
if (recipePage !== null) {
  recipePage.addEventListener("click", function () {
    window.location.href = "recipe-index.html";
  });
}

// Only to execute if user is on recipe page.
function isOnRecipePage() {
  return window.location.pathname.includes("recipe-index.html");
}

function saveRecipe() {
  getInstructionsData();
}
saveRecipe();

function getInstructionsData() {
  var savedMeals = JSON.parse(localStorage.getItem("savedMeals"));
  console.log(savedMeals);
  var recipeContainer = document.getElementById("recipe-container");
  var meal = savedMeals.meals[0];
  var measurementParent = document.createElement("div");
  var savedMealName = document.createElement("h1");
  var ingredientsH2 = document.createElement("h2");
  var instructionsH2 = document.createElement("h2");
  var instructions = document.createElement("p");

  savedMealName.textContent = savedMeals.meals[0].strMeal;
  ingredientsH2.textContent = "Ingredients";
  instructionsH2.textContent = "Instructions";
  instructions.textContent = meal.strInstructions;

  if (isOnRecipePage()) {
    measurementParent.append(savedMealName);
    recipeContainer.append(measurementParent);
    measurementParent.append(ingredientsH2);
  }

  // Filter all keys with the name 'Measure' that has a value.
  var measurement = Object.keys(meal).filter(
    (key) => key.includes("Measure") && meal[key] && meal[key].length
  );
  for (let amount of measurement) {
    var measurementList = document.createElement("p");
    // Replace Measure with Ingredient.
    var matchingIngredientKey = amount.replace("Measure", "Ingredient");
    // Concatenate the measurement value to the newly replaced value of ingredient.
    measurementList.textContent = meal[amount] + " " + meal[matchingIngredientKey];

    // e.target.append(measurementParent);
    measurementParent.append(measurementList);
  }
  measurementParent.append(instructionsH2);
  measurementParent.append(instructions);
}
