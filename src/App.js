import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import { useEffect, useState } from 'react';
import { getChamps } from './APIcalls';
import AllChamps from './AllChamps';
import ChampDetails from './ChampDetails';

function App() {
  const [champData, setChampData] = useState([]);

  useEffect(() => {
    getChamps()
      .then((data) => setChampData(Object.values(data.data)))
      .catch(error => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <main className="App">
        <header className="header">
          <Link to="/" className="header-link" aria-label='back-to-home'>
            <h1>ChampionHub</h1>
          </Link>
        </header>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Champions' element={<AllChamps champData={champData} />} />
          <Route path='/Champion/:name' element={<ChampDetails />} /> 
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;