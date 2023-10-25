import React, { useState } from 'react';
import './styles.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
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
    // Your search logic here
    // ...

  }
  const addIngredient = async() => {
    if (searchTerm.trim() !== '') {
      setSearchHistory((prevHistory) => [searchTerm, ...prevHistory]);

      // Clear the search term input
      setSearchTerm('');
    }
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient(); // Call handleSearch when Enter is pressed
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

  return (
    <div>
      <h1>EasyCooks</h1>
      <div className="search-container">
        <div className="search-input">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
          if (e.target.value.length <= 26) {
            setSearchTerm(e.target.value);
          }
          }}
          onKeyPress={handleKeyPress}
          placeholder="Add Ingredients Here"
          maxLength={26} // Set the maximum length to 26 characters
          />
          <button onClick={addIngredient}>Add</button>
        </div>
        <div className="search-results">
          {results.map((result) => (
            <div key={result.id} className="result-item">
              {result.name}
            </div>
          ))}
        </div>
      </div>
      <div className="search-history-container">
        <div className="search-history">
        <h2>Ingredients <button onClick={handleSearch}>Search</button> </h2>
        <ul>
          {searchHistory.map((term, index) => (
            <li key={index}>{term}</li>
          ))}
        </ul>
        </div>
        <div className="buttons-container">
        <button
          onClick={() => toggleFilter('glutenFree')}
          className={filters.glutenFree ? 'filter-button active' : 'filter-button'}
        >
          GF
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
}

export default Search;
