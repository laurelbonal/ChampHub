import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChampDetails } from '../../API-Utility/APIcalls';
import './ChampDetails.css';

const validTabs = ['about', 'abilities', 'ally-tips', 'enemy-tips'];
const validAbilities = ['Passive', 'Q', 'W', 'E', 'R'];

export default function ChampDetails() {
  const { name, tab, ability } = useParams();
  const navigate = useNavigate();
  const [champion, setChampion] = useState(null);
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || 'about'); 
  const [error, setError] = useState(false);

  useEffect(() => {
    // Validate tab and ability
    const isValidTab = validTabs.includes(tab);
    const isValidAbility = !ability || validAbilities.includes(ability);

    if (!isValidTab || !isValidAbility) {
      navigate('/error', { state: { message: 'Invalid URL', details: 'The URL you are trying to access does not exist or is malformed.', type: '404' }, replace: true });
      return;
    }

    if (!tab) {
      navigate(`/${name}/about`, { replace: true });
    }
  }, [name, tab, ability, navigate]);

  useEffect(() => {
    const fetchChampionDetails = async () => {
      try {
        const champDetails = await getChampDetails(name, navigate);
        setChampion(champDetails);
        if (!ability) {
          setSelectedAbility({ ...champDetails.passive, key: 'Passive' });
        } else {
          const abilityMap = {
            Passive: { ...champDetails.passive, key: 'Passive' },
            Q: { ...champDetails.spells[0], key: 'Q' },
            W: { ...champDetails.spells[1], key: 'W' },
            E: { ...champDetails.spells[2], key: 'E' },
            R: { ...champDetails.spells[3], key: 'R' },
          };
          setSelectedAbility(abilityMap[ability]);
        }
      } catch (error) {
        console.error('Error fetching champion details:', error);
        setError(true);
        navigate('/error', { state: { message: `Error fetching details for champion ${name}`, details: error.message, type: 'api' }, replace: true });
      }
    };

    fetchChampionDetails();
  }, [name, ability, navigate]);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const handleTabChange = (tab) => {
    if (tab === 'abilities' && !ability) {
      navigate(`/${name}/abilities/Passive`, { replace: true });
    } else {
      navigate(`/${name}/${tab}`, { replace: true });
    }
    setActiveTab(tab);
  };

  const handleAbilityChange = (e) => {
    const abilityKey = e.target.value;
    navigate(`/${name}/abilities/${abilityKey}`, { replace: true });
  };

  if (error) {
    return (
      <div>
        <h2>Cannot display that champion's data right now.</h2>
        <button className='home-button' onClick={() => navigate('/')}>Back to All Champs</button>
      </div>
    );
  }

  if (!champion) {
    return <div>Loading...</div>;
  }

  const renderTips = (tips) => (
    tips.length > 0 ? tips.join(' ') : 'No tips at this time.'
  );

  console.log('Selected Ability:', selectedAbility);

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
          <div className="nav-tabs">
            <button onClick={() => handleTabChange('about')} className={activeTab === 'about' ? 'active' : ''}>About</button>
            <button onClick={() => handleTabChange('abilities')} className={activeTab === 'abilities' ? 'active' : ''}>Abilities</button>
            <button onClick={() => handleTabChange('ally-tips')} className={activeTab === 'ally-tips' ? 'active' : ''}>Ally Tips</button>
            <button onClick={() => handleTabChange('enemy-tips')} className={activeTab === 'enemy-tips' ? 'active' : ''}>Enemy Tips</button>
          </div>
          <div className='info-box'>
          {activeTab === 'about' && (
            <div className='about'>
              <h2>About</h2>
              <p className="champion-blurb">
                {champion.lore}
              </p>
            </div>
          )}
          {activeTab === 'abilities' && (
            <div className="abilities-container">
              <h2>Abilities</h2>
              <select aria-label='ability' onChange={handleAbilityChange} value={ability || 'Passive'}>
                <option value="Passive">[Passive] {champion.passive.name}</option>
                {champion.spells.map((spell, index) => (
                  <option key={spell.id} value={['Q', 'W', 'E', 'R'][index]}>
                    {`[${['Q', 'W', 'E', 'R'][index]}] ${spell.name}`}
                  </option>
                ))}
              </select>
              {selectedAbility && (
                <div className="selected-ability">
                  <h3>{selectedAbility.name}</h3>
                  <img src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/${selectedAbility.key === 'Passive' ? 'passive' : 'spell'}/${selectedAbility.image.full}`} alt={selectedAbility.name} />
                  <p>{selectedAbility.description}</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'ally-tips' && (
            <div className="ally-tips">
              <h2>Ally Tips</h2>
              <p>{renderTips(champion.allytips)}</p>
            </div>
          )}
          {activeTab === 'enemy-tips' && (
            <div className="enemy-tips">
              <h2>Enemy Tips</h2>
              <p>{renderTips(champion.enemytips)}</p>
            </div>
          )}
          </div>
          <button className='home-button' onClick={() => navigate('/')}>Back to All Champs</button>
        </div>
        
      </div>
    </div>
  );
}