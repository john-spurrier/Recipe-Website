import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './styles.css';
import './Modal.css';

function Search() {
  const [results, setResults] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    glutenFree: false,
    keto: false,
    nutAllergy: false,
  });

  const toggleFilter = (filter) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter],
    });
  };

  const handleSearch = async () => {
    console.log("ENTERING HANDLESEARCH()");    
    try{
      const response = await axios.post('http://localhost:3001/api/query', {
        ingredients, 
        filters: {
          glutenFree: filters.glutenFree,
          keto: filters.keto,
          nutAllergy: filters.nutAllergy,
        },
      });
      setResults(response.data);
      console.log(results);
    } catch(error){
      console.error(error);
    }
  }
  
  
  const handleGFClick = () => {
    // Implement functionality for Gluten-Free filter
  };

  const handleKetoClick = () => {
    // Implement functionality for Keto filter
  };

  const handleNutAllergyClick = () => {
    // Implement functionality for Nut Allergy filter
  };


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = results.slice(startIndex,endIndex);
  const totalpages = Math.ceil(results.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  }

  const openModal = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  const handleIngredientChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      // Add ingredient to the list
      console.log(`Adding ${value} to ingredients`);
      setIngredients((prevIngredients) => [...prevIngredients, value]);
      console.log('Added ', ingredients);
    } else {
      // Remove ingredient from the list
      console.log('removing');
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient !== value)
      );
      console.log('removed');
    }
  };


  const ingredientsList = [
    'Chicken', 'Beef', 'Pork', 'Tofu', 'Cheese',
    'Tomato', 'Rice', 'Flour', 'Sugar', 'Water', 
    'Potato', 'Milk', 'Butter','Bread', 'Salt', 
    'Pepper', 'Cherry', 'Oil', 'Nuts', 'Yogurt'];

  return (
    <div> 
      <h1>EasyCooks</h1>
      
      <div className="content-container">
      {results.length > 0 && (
        <div>
          <ul>
            {currentItems.map((item,index) => (
              <li key = {index} className = "smallText"> 
                {item[0]} - {item[7]} 
                <button onClick = {() => openModal(item)}> Show Details </button>
              </li>
            ))}
          </ul>

          <div>
            <button onClick={() => goToPage(currentPage - 1)} disabled = {currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalpages} </span>
            <button onClick = {() => goToPage(currentPage + 1)} disabled = {currentPage === totalpages}>
              Next
            </button>
          </div>
        </div>
      )}
      </div>
      {selectedItem && (
        <Modal item = {selectedItem} onClose={closeModal}/>
      )}
	   <div className="search-history-container">
        <div className="search-history">
        <h2>Ingredients <button onClick={handleSearch}>Search</button> </h2>
        </div>
        <div className="ingredient-list">
        <form>
        {ingredientsList.map((ingredient, index) => {
          const lowercaseIngredient = ingredient.toLowerCase();
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={`ingredient_${index}`}
                value={lowercaseIngredient} // Assigning lowercase value
                onChange={handleIngredientChange}
                checked={ingredients.includes(lowercaseIngredient)}
              />
              <label htmlFor={`ingredient_${index}`}>{ingredient}</label>
            </div>
          );
        })}
      </form>
        </div>
        <div className="buttons-container">
        <button
          onClick={() => toggleFilter('glutenFree')}
          className={filters.glutenFree ? 'filter-button active' : 'filter-button'}
        >
          Gluten Free
        </button>
        <button
          onClick={() => toggleFilter('keto')}
          className={filters.keto ? 'filter-button active' : 'filter-button'}
        >
          Keto
        </button>
        <button
          onClick={() => toggleFilter('nutAllergy')}
          className={filters.nutAllergy ? 'filter-button active' : 'filter-button'}
        >
          Nut Allergy
        </button>
      </div>
      </div>
    </div>
  );
};

export default Search;