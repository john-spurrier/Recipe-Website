import React, {useEffect, useState} from 'react';
import Modal from "./Modal";
import './Modal.css';
function Saved() {
  // You can fetch the saved recipes or load them from a state or storage
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
  }

  const closeModal = (item) => {
    setSelectedItem(null);
  }

  useEffect(() => {
    const options = JSON.parse(sessionStorage.getItem('savedOptions')) || [];
    setSavedRecipes(options);
  }, [selectedItem])

  return (
    <div className='container'>
      <h1>Saved Recipes</h1>
      <div className = "saved-recipe-container">
        <div>
          {savedRecipes.map((item, index) => (
            <div key={index} className = "recipe-box">
              <h3>{item[0]}</h3>
              <p>{item[7]}</p>
              <button onClick={() => openModal(item)}>Show Details</button>
            </div>
          ))}
        </div>
        {selectedItem && (
          <Modal item = {selectedItem} onClose = {closeModal}/>
        )}
      </div>
    </div>
  );
}

export default Saved;