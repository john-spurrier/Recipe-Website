// IntroPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import backgroundImage from './Background.jpg';

function IntroPage() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    height: '100vh', // You can adjust this based on your design
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Center items horizontally
    color: 'white', // set the text color to white
  };

  const buttonStyle = {
    backgroundColor: '#3498db', // Set the button background color, you can use any valid CSS color value
    color: 'white', // Set the button text color
    padding: '10px 20px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div className="container" style = {containerStyle}>
      <h1>Welcome to Easy Cooks</h1>
      <p>Discover delicious recipes and simplify your cooking experience.</p>
      <p> Created by: Steven Hu, Jordan Insinger, John Spurrier</p>
      <Link to="/mainpage">
        <button style = {buttonStyle}>Start Here!</button>
      </Link>
    </div>
  );
};

export default IntroPage;
