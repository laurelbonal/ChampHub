import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import './ChampCard.css';
import formatChampionName from '../../API-Utility/Utility';

function ChampCard({ name, image, blurb }) {
  const navigate = useNavigate();
  const { name: paramName } = useParams();

  const handleCardClick = () => {
    const formattedName = formatChampionName(name);
    navigate(`/${formattedName}/about`);
  };

  return (
    <div className="champ-card" onClick={handleCardClick}>
      <img src={image} alt={name} className="champ-image" />
      <h2 className="champ-name">{name}</h2>
      <p className="champ-blurb">{blurb}</p>
    </div>
  );
}

ChampCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired
};

export default ChampCard;