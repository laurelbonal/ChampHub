import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChampDetails } from './APIcalls';
import './ChampDetails.css';

export default function ChampDetails() {
  const { name, tab, ability } = useParams();
  const navigate = useNavigate();
  const [champion, setChampion] = useState(null);
  const [selectedAbility, setSelectedAbility] = useState(null);
  const [activeTab, setActiveTab] = useState(tab || 'about'); 
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!tab) {
      navigate(`/champion/${name}/about`, { replace: true });
    }
  }, [name, tab, navigate]);

  useEffect(() => {
    const fetchChampionDetails = async () => {
      try {
        const champDetails = await getChampDetails(name);
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
      }
    };

    fetchChampionDetails();
  }, [name, ability]);

  useEffect(() => {
    if (tab) {
      setActiveTab(tab);
    }
  }, [tab]);

  const handleTabChange = (tab) => {
    if (tab === 'abilities' && !ability) {
      navigate(`/champion/${name}/abilities/Passive`, { replace: true });
    } else {
      navigate(`/champion/${name}/${tab}`, { replace: true });
    }
    setActiveTab(tab);
  };

  const handleAbilityChange = (e) => {
    const abilityKey = e.target.value;
    navigate(`/champion/${name}/abilities/${abilityKey}`, { replace: true });
  };

  if (error) {
    return (
      <div>
        <h2>Cannot display that champion's data right now.</h2>
        <button className='home-button' onClick={() => navigate('/Champions')}>Back to All Champs</button>
      </div>
    );
  }

  if (!champion) {
    return <div>Loading...</div>;
  }

  const renderTips = (tips) => (
    tips.length > 0 ? tips.join(' ') : 'No tips at this time.'
  );

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
                <div className="ability-details">
                  <h3>{`[${selectedAbility.key}] ${selectedAbility.name}`}</h3>
                  <p>{selectedAbility.description}</p>
                </div>
              )}
            </div>
          )}
          {activeTab === 'ally-tips' && (
            <div className="tips-section">
              <h2>Ally Tips</h2>
              <p>{renderTips(champion.allytips)}</p>
            </div>
          )}
          {activeTab === 'enemy-tips' && (
            <div className="tips-section">
              <h2>Enemy Tips</h2>
              <p>{renderTips(champion.enemytips)}</p>
            </div>
          )}
          <button className='home-button' onClick={() => navigate('/Champions')}>Back to All Champs</button>
        </div>
      </div>
    </div>
  );
}
