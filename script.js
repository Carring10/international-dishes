var resultsContainer = document.getElementById("search-results-container");

function getMealApi() {
<<<<<<< HEAD
  // API URL for specified country.
  var countryUrl =
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican";

  fetch(countryUrl)
=======
  var url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican";

  fetch(url)
>>>>>>> main
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < 5; i++) {
        var mealName = document.createElement("h2");
<<<<<<< HEAD
        // Show ingredients button.
=======
>>>>>>> main
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
<<<<<<< HEAD
  var ingredientsUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
  console.log(e.target.id);
=======
  var ingredientsUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + e.target.id;
  fetch(ingredientsUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
>>>>>>> main
}
