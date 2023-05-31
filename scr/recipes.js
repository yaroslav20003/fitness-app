function buildRecipes(){
        const searchBtn = document.getElementById('search-btn');
const mealList = document.querySelector('.meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', function() {
        mealDetailsContent.parentElement.classList.remove('showRecipe');
})
//get meal list that matches with the ingredients
function getMealList() {
        let searchInputTxt = document.getElementById('search-input').value.trim();
        let url = 'http://www.themealdb.com/api/json/v1/1/filter.php?i=egg';
        fetch(`http://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
        .then(response => response.json())
        .then(data => {
                let html = '';
                if (data.meals){
                        data.meals.forEach(meal => {
                                html += `
                                <div class="meal-item" data-id = ${meal.idMeal}>
                                        <div class="meal-img">
                                                <img src="${meal.strMealThumb}" alt="potato">
                                        </div>
                                        <div class="meal-name">
                                                <h3>${meal.strMeal}</h3>
                                                <a href="#" class="recipe-btn">Get recipe</a>
                                        </div>
                                </div>`;
                        });
                        mealList.classList.remove('notFound');

                } else {
                        html = 'Sorry, there is no such meal:('
                        mealList.classList.add('notFound');
                }
                mealList.innerHTML = html;
        })
}
function getMealRecipe(event) {
        event.preventDefault();
        if(event.target.classList.contains('recipe-btn')){
                let mealItem = event.target.parentElement.parentElement;
                fetch(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
                .then(response => response.json())
                .then(data => mealRecipeModal(data.meals));
        }

}
function mealRecipeModal(meal) {
        meal = meal[0];
        let html = `
                        <h2 class="recipe-title">${meal.strMeal}</h2>
                        <p class="recipe-category">${meal.strCategory}</p>
                        <div class="recipe-instruct">
                                <h3>Instructions:</h3>
                                
                                <p>${meal.strInstructions}</p>
                        </div>
                        <div class="recipe-meal-img">
                                <img src="${meal.strMealThumb}" alt="potato">
                        </div>
                        <div class="recipe-link">
                                <a href="${meal.strYoutube}" target="_blank">Watch video</a>
                        </div>`;
        mealDetailsContent.innerHTML = html;
        mealDetailsContent.parentElement.classList.add('showRecipe');
}
}
buildRecipes();