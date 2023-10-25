import React, { useState } from 'react';
import './styles.css';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results] = useState([]);
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
    // Implement your search logic here
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
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className="filters">
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
      <div className="search-results">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            {result.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
