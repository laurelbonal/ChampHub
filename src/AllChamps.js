import React, { useState, useEffect } from 'react';
import './AllChamps.css';
import ChampCard from './ChampCard';

export default function AllChamps({ champData }) {
  const [filteredChampions, setFilteredChampions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

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
      <h1>All Champs</h1>
      <p>Filter by champ type and difficulty level to find the perfect match for your play style</p>
      <div className="filter-controls">
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">All Types</option>
          <option value="Fighter">Fighter</option>
          <option value="Mage">Mage</option>
          <option value="Assassin">Assassin</option>
          <option value="Tank">Tank</option>
          <option value="Support">Support</option>
        </select>
        <select value={selectedDifficulty} onChange={handleDifficultyChange}>
          <option value="">All Difficulties</option>
          <option value="1">1 - Easy</option>
          <option value="2">2 - Moderate</option>
          <option value="3">3 - Hard</option>
          <option value="4">4 - Very Hard</option>
          <option value="5">5 - Extreme</option>
        </select>
        <input
          type="text"
          placeholder="Search champions..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button onClick={handleClearSearch}>Clear Search</button>
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