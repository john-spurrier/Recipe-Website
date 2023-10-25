import React, { useEffect, useState } from 'react';
import './Modal.css'; // CSS for the modal

const Modal = ({ item, onClose }) => {

  const [isSaved,setIsSaved] = useState(false);

  useEffect(() => {
    const savedOptions = JSON.parse(sessionStorage.getItem('savedOptions')) || [];
    setIsSaved(savedOptions.some((itm) => itm.uniqueIdentifier === item.uniqueIdentifier));
  }, [item.uniqueIdentifier]);

  const handleSave = (item) => {

    if(isSaved)
    {
      const savedOptions = JSON.parse(sessionStorage.getItem('savedOptions')) || [];
      const updatedSavedOptions = savedOptions.filter((itm) => itm.uniqueIdentifier !== item.uniqueIdentifier);
      sessionStorage.setItem('savedOptions', JSON.stringify(updatedSavedOptions));
      setIsSaved(false);
    }
    else
    {
      const savedOptions = JSON.parse(sessionStorage.getItem('savedOptions')) || [];
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
        <button className = "modal-save" onClick = {onClose}>
          Close
        </button>
        <button className="modal-close" onClick={() => handleSave(item)}>
          {isSaved ? "Saved": "Save"}
        </button>
        <h2>{item[0]}</h2>
        <p>{item[7]}</p>
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