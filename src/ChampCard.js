import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChampCard.css';

function ChampCard({ name, image, blurb }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/Champion/${name}`);
  };

  return (
    <div className="champ-card" onClick={handleCardClick}>
      <img src={image} alt={name} className="champ-image" />
      <h2 className="champ-name">{name}</h2>
      <p className="champ-blurb">{blurb}</p>
    </div>
  );
}

export default ChampCard;