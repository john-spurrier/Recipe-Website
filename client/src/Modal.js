import React from 'react';
import './Modal.css'; // CSS for the modal

const Modal = ({ item, onClose }) => {

    const elements = item[6].replace(/^\[|\]$/g, '').split(/', '/);
    const finalElements = elements.map((element) => element.replace(/'/g, ''));
    console.log(item[6]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          Close
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