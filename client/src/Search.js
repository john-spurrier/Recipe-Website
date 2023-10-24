import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [ingredients, setingredients] = useState(['orange', 'celery']);
  const itemsPerPage = 10;
  const [currentPage,setCurrentPage] = useState(1);

  const handleSearch = async () => {
    console.log("ENTERING HANDLESEARCH()");
    // Implement your search logic here
    try{
      const response = await axios.post('http://localhost:3001/api/query', ingredients);

      setResults(response.data);
      console.log(results);
    } catch(error){
      console.error(error);
    }
  }

  // code for splitting the array up into pages that contain 10 items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = results.slice(startIndex,endIndex);
  const totalpages = Math.ceil(results.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
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

      {results.length > 0 && (
        <div>
        <ul>
          {currentItems.map((item,index) => (
            <li key = {index} className = "smallText"> 
              {item[0]} - {item[7]} 
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