import React from 'react';
import './ChampCard.css';

function ChampCard({ image, name, blurb }) {
  return (
    <div className="champ-card">
      <img src={image} alt={name} className="champ-image" />
      <h2 className="champ-name">{name}</h2>
      <p className="champ-blurb">{blurb}</p>
    </div>
  );
}

export default ChampCard;