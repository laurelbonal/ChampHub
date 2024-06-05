import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChampCard.css';
import formatChampionName from './Utility';

function ChampCard({ name, image, blurb }) {
    const navigate = useNavigate();
    const { name: paramName } = useParams();

    const handleCardClick = () => {
        const formattedName = formatChampionName(name);
        navigate(`/Champion/${formattedName}`);
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