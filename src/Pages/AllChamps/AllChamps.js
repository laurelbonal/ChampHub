import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import './AllChamps.css';
import ChampCard from './ChampCard';

export default function AllChamps({ champData }) {
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.toLowerCase() !== '/') {
      navigate('/error', { state: { message: 'Invalid URL', details: 'The URL you are trying to access does not exist or is malformed.', type: '404' }, replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    setFilteredChampions(champData);
  }, [champData]);

  useEffect(() => {
    filterChampions(searchTerm, selectedType, selectedDifficulty);
  }, [searchTerm, selectedType, selectedDifficulty, champData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedDifficulty('');
    setFilteredChampions(champData);
  };

  const filterChampions = (search, type, difficulty) => {
    let filtered = champData;
    if (search) {
      filtered = filtered.filter(champ => champ.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (type) {
      filtered = filtered.filter(champ => champ.tags.includes(type));
    }
    if (difficulty) {
      filtered = filtered.filter(champ => champ.info.difficulty === parseInt(difficulty));
    }
    setFilteredChampions(filtered);
  };

  return (
    <div>
      <div className="sticky-container">
        <h1>All Champs</h1>
        <p>Filter by champ type and difficulty level to find the perfect match for your play style</p>
        <div className="filter-controls">
          <select value={selectedType} className='dropdown' aria-label="Type" onChange={handleTypeChange}>
            <option value="">All Types</option>
            <option value="Fighter">Fighter</option>
            <option value="Mage">Mage</option>
            <option value="Assassin">Assassin</option>
            <option value="Tank">Tank</option>
            <option value="Support">Support</option>
          </select>
          <select value={selectedDifficulty} className='dropdown' aria-label="Difficulty" onChange={handleDifficultyChange}>
            <option value="">All Difficulties</option>
            <option value="1">1 - Easy</option>
            <option value="2">2 - Moderate</option>
            <option value="3">3 - Hard</option>
            <option value="4">4 - Very Hard</option>
            <option value="5">5 - Extreme</option>
          </select>
          <input
            className='search'
            type="text"
            placeholder="Search champions..."
            aria-label="Search champions"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className='clear-button' onClick={handleClearSearch}>Clear</button>
        </div>
      </div>
      <div className="champ-grid">
        {filteredChampions.length > 0 ? (
          filteredChampions.map(champ => (
            <ChampCard
              key={champ.id}
              image={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`}
              name={champ.name}
              blurb={champ.blurb}
            />
          ))
        ) : (
          <p>No champions match the criteria</p>
        )}
      </div>
    </div>
  );
}

AllChamps.propTypes = {
  champData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    blurb: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    info: PropTypes.shape({
      difficulty: PropTypes.number.isRequired
    }).isRequired
  })).isRequired
};