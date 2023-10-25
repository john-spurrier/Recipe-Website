import React from 'react';

function Saved() {
  // You can fetch the saved recipes or load them from a state or storage
  const savedRecipes = [
    { id: 1, name: 'Saved Recipe 1' },
    { id: 2, name: 'Saved Recipe 2' },
    // Add more saved recipes here
  ];

  return (
    <div className='container'>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Saved;