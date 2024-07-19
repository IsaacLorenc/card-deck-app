import React from 'react';
import './DrawButton.css';

function DrawButton({ drawCard }) {
  return (
    <button className="DrawButton" onClick={drawCard}>
      Draw Card
    </button>
  );
}

export default DrawButton;