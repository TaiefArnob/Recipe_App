const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipeContainer');
const recipeDetailsContent=document.querySelector('.recipeDetailsContent');
const closeBtn=document.querySelector('.fa');


async function fetchRecipe(recipeName){
    recipeContainer.innerHTML='<h2>Fetching Recipes...</h2>'
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`);

    const response= await data.json();
    

    recipeContainer.innerHTML='';
    response.meals.forEach(meal=>{
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML=`
        
            <img src='${meal.strMealThumb}'>
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Category : <span>${meal.strCategory}</span></p>
        `
        const button=document.createElement('button');
        button.textContent='View Recipe'
        recipeDiv.appendChild(button);


        button.addEventListener('click',()=>{
            openRecipePopUp(meal);
        });

        recipeContainer.appendChild(recipeDiv);
    })
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();

    const searchInput=searchBox.value.trim();
    fetchRecipe(searchInput); 
})

function openRecipePopUp(meal){
    recipeDetailsContent.innerHTML=`
        <h2 class='recipeName'>${meal.strMeal}</h2>
        <h3>Ingredients : </h3>
        <ul class='ingredientsList'>${fetchIngredients(meal)}</ul>
        <div>
            <h3>Instructions</h3>
            <p class='recipeInstructions'>${meal.strInstructions}</p>
        </div>

    `
    recipeDetailsContent.parentElement.style.display='block';
}


function fetchIngredients(meal){
    console.log(meal);
    let ingredientsList='';
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientsList+=`<li>${measure} ${ingredient}</li>`
        }
        else{
           break; 
        }
    }
    return ingredientsList;
}

closeBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    recipeDetailsContent.parentElement.style.display='none';
})