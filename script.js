var resultsContainer = document.getElementById("search-results-container");
var cardContainer = document.getElementById("card-container");
var select = document.getElementById("ethnicity");
// Recipe Page.
var recipePage = document.getElementById("recipe-page-button");
var measurementParent = document.createElement("div");
var drinkContainer = document.getElementById("drink-container");
var dranks = document.getElementById("drinkButton");

//Cocktail API
function getDrinkApi(option) {
  var drinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

  fetch(drinkUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var drink = data.drinks[0];

      drinkContainer.setAttribute(
        "class",
        "p-5 mb-4 text-white bg-primary border rounded-3 mx-auto"
      );
      drinkContainer.innerHTML = "";
      var randomDrink = document.createElement("div");
      var drinkName = document.createElement("h3");
      var drinkThumb = document.createElement("img");
      var drinkIngredientH3 = document.createElement("h3");
      var drinkIngredient = document.createElement("p");
      var drinkRecipeH3 = document.createElement("h3");
      var drinkRecipe = document.createElement("p");
      var drinkGlass = document.createElement("p");

      randomDrink.setAttribute("class", "p-5 mb-4 bg-light rounded-3");
      drinkName.textContent = data.drinks[0].strDrink;
      drinkThumb.src = data.drinks[0].strDrinkThumb;
      drinkThumb.height = 300;
      drinkThumb.width = 300;
      drinkThumb.className = "img-thumbnail m-3";
      drinkThumb.textContent = data.drinks[0].strDrinkThumb;
      drinkIngredientH3.textContent = "Ingredients";
      drinkIngredient.textContent = data.drinks[0].strIngredients;
      drinkRecipeH3.textContent = "Instructions";
      drinkRecipe.textContent = data.drinks[0].strInstructions;
      drinkGlass.textContent = "Serve in: " + data.drinks[0].strGlass;
      drinkContainer.append(drinkName);
      drinkContainer.append(drinkThumb);
      drinkContainer.append(drinkIngredientH3);
      var measurement = Object.keys(drink).filter(
        (key) => key.includes("Measure") && drink[key] && drink[key].length
      );

      for (let amount of measurement) {
        var measurementList = document.createElement("p");
        // Replace Measure with Ingredient.
        var matchingIngredientKey = amount.replace("Measure", "Ingredient");
        // Concatenate the measurement value to the newly replaced value of ingredient.
        measurementList.textContent = drink[amount] + " " + drink[matchingIngredientKey];

        drinkContainer.append(measurementList);
      }

      drinkContainer.append(drinkIngredient);
      drinkContainer.append(drinkRecipeH3);
      drinkContainer.append(drinkRecipe);

      drinkContainer.append(drinkName);
      drinkContainer.append(drinkThumb);
      drinkContainer.append(drinkIngredientH3);
      var measurement = Object.keys(drink).filter(
        (key) => key.includes("Measure") && drink[key] && drink[key].length
      );

      for (let amount of measurement) {
        var measurementList = document.createElement("p");
        // Replace Measure with Ingredient.
        var matchingIngredientKey = amount.replace("Measure", "Ingredient");
        // Concatenate the measurement value to the newly replaced value of ingredient.
        measurementList.textContent = drink[amount] + " " + drink[matchingIngredientKey];

        drinkContainer.append(measurementList);
      }

      drinkContainer.append(drinkIngredient);
      drinkContainer.append(drinkRecipeH3);
      drinkContainer.append(drinkRecipe);

      drinkContainer.append(drinkGlass);
    });
}

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

        drinkContainer.style.display = "none";
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

  fetch(ingredientsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (ingredientsData) {
      console.log(ingredientsData);

      var meal = ingredientsData.meals[0];

      var measurementParent = document.createElement("div");
      measurementParent.id = mealId + "_ingredients";

      var ingredientsH2 = document.createElement("h3");
      var instructionsH2 = document.createElement("h3");
      var instructions = document.createElement("p");
      var saveRecipeBtn = document.createElement("button");
      saveRecipeBtn.setAttribute("class", "btn btn-primary");

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
        var savedItems = JSON.parse(localStorage.getItem("savedMeals")) || [];
        savedItems.push(ingredientsData);
        localStorage.setItem("savedMeals", JSON.stringify(savedItems));
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

// Only to execute if user is on recipe page.
function isOnRecipePage() {
  return window.location.pathname.includes("recipe-index.html");
}

function saveRecipe() {
  getInstructionsData();
}

function getInstructionsData() {
  var savedMeals = JSON.parse(localStorage.getItem("savedMeals")) || [];

  for (var item of savedMeals) {
    var recipeContainer = document.getElementById("recipe-container");
    var meal = item.meals[0];
    var measurementParent = document.createElement("div");
    var savedMealName = document.createElement("h1");
    var ingredientsH2 = document.createElement("h2");
    var instructionsH2 = document.createElement("h2");
    var instructions = document.createElement("p");

    savedMealName.textContent = item.meals[0].strMeal;
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
  // Cocktail Randomizer
  if (dranks !== null) {
    dranks.addEventListener("click", function (event) {
      getDrinkApi(event.target.value);
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

  // To change file path to recipe page.
  if (recipePage !== null) {
    recipePage.addEventListener("click", function () {
      window.location.href = "recipe-index.html";
    });
  }

  saveRecipe();
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
}
