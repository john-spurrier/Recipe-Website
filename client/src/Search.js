import React, { useState } from 'react';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    // Implement your search logic here
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