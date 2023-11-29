// MainPage.js
import React from 'react';
import Search from './Search'
import { Link } from 'react-router-dom';
import './styles.css';

const MainPage = () => {
  return (
    <div className="container">
      <Link to="/saved" className="saved-button">
        Go to Saved Recipes
      </Link>
      {<Search />}
    </div>
  );
};

export default MainPage;
