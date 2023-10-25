// IntroPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function IntroPage() {
  return (
    <div className="container">
      <h1>Welcome to Easy Cooks</h1>
      <p>Discover delicious recipes and simplify your cooking experience.</p>
      <Link to="/mainpage">
        <button>Continue</button>
      </Link>
    </div>
  );
};

export default IntroPage;
