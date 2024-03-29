document.addEventListener('DOMContentLoaded', () => {
    const mealsContainer = document.getElementById('meals');
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const mealTitle = document.getElementById('meal-title');
    const ingredients = document.getElementById('ingredients');
    const instructions = document.getElementById('instructions');

    // Fetch meals from API
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meals = data.meals;
            meals.forEach(meal => {
                const mealCard = document.createElement('div');
                mealCard.classList.add('meal-card');
                mealCard.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <p>${meal.strMeal}</p>
                `;
                mealCard.addEventListener('click', () => {
                    showMealDetails(meal);
                });
                mealsContainer.appendChild(mealCard);
            });
        })
        .catch(error => console.log('Error fetching data:', error));

    // Show meal details in modal
    function showMealDetails(meal) {
        mealTitle.textContent = meal.strMeal;
        ingredients.innerHTML = '';
        instructions.textContent = meal.strInstructions;
        
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`]) {
                const ingredient = document.createElement('p');
                ingredient.textContent = `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`;
                ingredients.appendChild(ingredient);
            } else {
                break;
            }
        }
        
        modal.style.display = 'block';
    }

    // Close modal when clicking on close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', event => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
