import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChampDetails } from './APIcalls';
import './ChampDetails.css';

export default function ChampDetails() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [champion, setChampion] = useState(null);
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [displayTips, setDisplayTips] = useState(null); // null, 'ally', 'enemy'
  const [error, setError] = useState(false); // Error state

  useEffect(() => {
    const fetchChampionDetails = async () => {
      try {
        const champDetails = await getChampDetails(name);
        setChampion(champDetails);
        setSelectedAbility({ ...champDetails.passive, key: 'Passive' }); // Set the default selected ability to passive
      } catch (error) {
        console.error('Error fetching champion details:', error);
        setError(true); // Set error state to true if API call fails
      }
    };

    fetchChampionDetails();
  }, [name]);

  const handleAbilityChange = (e) => {
    const abilityIndex = e.target.value;
    if (abilityIndex === 'passive') {
      setSelectedAbility({ ...champion.passive, key: 'Passive' });
    } else {
      const keys = ['Q', 'W', 'E', 'R'];
      setSelectedAbility({ ...champion.spells[abilityIndex], key: keys[abilityIndex] });
    }
    setDisplayTips(null); 
  };

  const handleDisplayTips = (type) => {
    setDisplayTips(type);
  };

  if (error) {
    return (
      <div>
        <h2>Cannot display that champion's data right now.</h2>
        <button className='home-button' onClick={() => navigate('/Champions')}>Back to All Champs</button>
      </div>
    )
    
  }

  if (!champion) {
    return <div>Loading...</div>;
  }

  const tipsToDisplay = displayTips === 'ally' ? champion.allytips : displayTips === 'enemy' ? champion.enemytips : null;
  const titleToDisplay = displayTips === 'ally' ? 'Ally Tips' : 'Enemy Tips';
  const tipsContent = tipsToDisplay && tipsToDisplay.length > 0 ? tipsToDisplay.join(' ') : 'No tips at this time.';

  return (
    <div className="champion-details">
      <div className="champion-container">
        <div className="champion-info">
          <h1>{champion.name}</h1>
          <h2>{champion.title}</h2>
          <div className="champion-image">
            <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`} alt={champion.name} />
          </div>
          <div className="champion-meta">
            <div className="champion-difficulty">
              <span>Difficulty Level: {champion.info.difficulty}</span>
            </div>
            <div className="champion-role">
              <span>Role: {champion.tags.join(', ')}</span>
            </div>
          </div>
          <div className="champion-blurb-abilities-container">
            <div className='about'>
              <h2>{displayTips ? titleToDisplay : 'About'}</h2>
              <p className="champion-blurb">
                {displayTips ? tipsContent : champion.blurb}
              </p>
            </div>
            <div className="abilities-container">
              <h2>Abilities</h2>
              <select aria-label='ability' onChange={handleAbilityChange}>
                <option value="passive">[Passive] {champion.passive.name}</option>
                {champion.spells.map((spell, index) => (
                  <option key={spell.id} value={index}>
                    {`[${['Q', 'W', 'E', 'R'][index]}] ${spell.name}`}
                  </option>
                ))}
              </select>
              {selectedAbility && (
                <div className="ability-details">
                  <h3>{`[${selectedAbility.key}] ${selectedAbility.name}`}</h3>
                  <p>{selectedAbility.description}</p>
                </div>
              )}
            </div>
          </div>
          <div className="tips-buttons">
            <button className='ally-tips' onClick={() => handleDisplayTips('ally')}>Ally Tips</button>
            <button className='enemy-tips' onClick={() => handleDisplayTips('enemy')}>Enemy Tips</button>
          </div>
          <button className='home-button' onClick={() => navigate('/Champions')}>Back to All Champs</button>
        </div>
      </div>
    </div>
  );
}