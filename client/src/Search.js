import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [ingredients, setingredients] = useState(['orange', 'celery']);

  const handleSearch = async () => {
    // Implement your search logic here
    console.log(ingredients);
    try{
      const response = await axios.post('http://localhost:3001/api/query', ingredients);

      setResults(response.data);

    } catch(error){
      console.error(error);
    }

    console.log(results);

  }

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
    
      
    </div>
  );
}
/*
deleted code from line 36 for testing purposes, can replace later
<div className="search-results">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            {result.name}
          </div>
        ))}
      </div>*/

export default Search;