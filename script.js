let recipes = [];

fetch("recipes.json")
.then(res => res.json())
.then(data => {

recipes = data;
displayDishes(recipes);

});

function displayDishes(list){

const dishList = document.getElementById("dishList");
const count = document.getElementById("recipeCount");

dishList.innerHTML = "";

count.textContent = list.length + " recipes found";

if(list.length === 0){

dishList.innerHTML = "<li>No recipes found</li>";
return;

}

list.forEach(recipe => {

const li = document.createElement("li");

li.textContent = recipe.title;

li.addEventListener("click", () => {
showRecipe(recipe);
});

dishList.appendChild(li);

});

}

function showRecipe(recipe){

const panel = document.getElementById("recipeDetails");

panel.innerHTML = `

<h2>${recipe.title}</h2>

<h3>Ingredients</h3>
<ul>
${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}
</ul>

<h3>Instructions</h3>
<ol>
${recipe.instructions.map(i => `<li>${i}</li>`).join("")}
</ol>

<a class="instagram" href="${recipe.instagram_link}" target="_blank">
View Instagram Post
</a>

`;

}

document.getElementById("search").addEventListener("input", function(){

const value = this.value.toLowerCase();

const filtered = recipes.filter(recipe =>
recipe.title.toLowerCase().includes(value)
);

displayDishes(filtered);

});

document.querySelectorAll(".filter").forEach(button => {

button.addEventListener("click", () => {

const category = button.dataset.category;

if(category === "All"){
displayDishes(recipes);
}
else{

const filtered = recipes.filter(recipe =>
recipe.category === category
);

displayDishes(filtered);

}

});

});

document.getElementById("randomRecipe").addEventListener("click", () => {

const randomIndex = Math.floor(Math.random()*recipes.length);

showRecipe(recipes[randomIndex]);

});