import React, { useEffect, useState } from 'react';
import './Modal.css'; // CSS for the modal

const Modal = ({ item, onClose }) => {

  const [isSaved,setIsSaved] = useState(false);

  useEffect(() => {
    const savedOptions = JSON.parse(sessionStorage.getItem('savedOptions')) || [];
    setIsSaved(savedOptions.some((itm) => itm[1] === item[1]));
  }, [item.name]);

  const handleSave = (item) => {
    const savedOptions = JSON.parse(sessionStorage.getItem('savedOptions')) || [];

    if(isSaved)
    {
      const updatedSavedOptions = savedOptions.filter((itm) => {
        return itm[1] !== item[1];
    });
      sessionStorage.setItem('savedOptions', JSON.stringify(updatedSavedOptions));
      setIsSaved(false);
    }
    else
    {
      savedOptions.push(item);
      sessionStorage.setItem('savedOptions', JSON.stringify(savedOptions));
      setIsSaved(true);
    }
    console.log(JSON.parse(sessionStorage.getItem('savedOptions')));
  };

    const elements = item[6].replace(/^\[|\]$/g, '').split(/', '/);
    const finalElements = elements.map((element) => element.replace(/'/g, ''));
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className = "modal-close" onClick = {onClose}>
          Close
        </button>
        <button className="modal-save-button" onClick={() => handleSave(item)}>
          {isSaved ? "Unsave": "Save"}
        </button>
        <h2>{item[0]}</h2>
        <p>{item[7]}</p>
        <h2>{"Recipe Steps"}</h2>
        <hr style = {{ borderTop: '2px solid black', width: '100%', margin:0}}/>
        <div className = "modal-scrollable-content">
          {finalElements.map((desc,index) => (
            <li key = {index}>{desc}</li>
          ))}
          </div>
      </div>
    </div>
  );
};

export default Modal;