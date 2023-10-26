import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './styles.css';
import './Modal.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [results, setResults] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
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
  
    const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addToList(); // Call handleSearch when Enter is pressed
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

  const addToList = () => {
	  if (searchTerm.trim() !== '') {
      setSearchHistory((prevHistory) => [searchTerm, ...prevHistory]);

      // Clear the search term input
      setSearchTerm('');
    }
    setIngredients((ingre) => [...ingre, searchTerm]);
    console.log(ingredients);
  }

  const handleInputChange = (event) => {
    const inputV = event.target.value;
    setSearchTerm(inputV);

    const suggestions = getSuggestions(inputV);
    setSuggestions(suggestions);

    setShowSuggestions(inputV !== '');
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  }

  const getSuggestions = (inputV) => {
    const suggestionsList = [
      'apple','banana','chicken','orange','celery','cherry','tomato','potato','onion','lettuce','cabbage',
    ];
    return suggestionsList.filter((item) => 
      item.toLowerCase().includes(inputV.toLowerCase())
    );
  };

  return (
    <div> 
      <h1>EasyCooks</h1>
      <input
        type="text"
        value={searchTerm}
        onChange = {handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Add Ingredients Here"
      />
      {showSuggestions && (
        <ul
          style = {{
            position: 'absolute',
            zIndex: 1,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            padding: '5px',
            listStyle: 'none',
            margin: 0,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            width: '200px',
          }}
          >
          {suggestions.map((suggestion, index) => (
            <li
            key = {index}
            style = {{
              padding: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onClick = {() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button onClick = {addToList}>Add</button>
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
      {selectedItem && (
        <Modal item = {selectedItem} onClose={closeModal}/>
      )}
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
};

export default Search;