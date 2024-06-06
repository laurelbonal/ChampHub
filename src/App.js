import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import Homepage from './Pages/HomePage/Homepage';
import { useEffect, useState } from 'react';
import { getChamps } from './API-Utility/APIcalls';
import AllChamps from './Pages/AllChamps/AllChamps';
import ChampDetails from './Pages/ChampDetails/ChampDetails';
import ErrorPage from './Pages/Error/ErrorPage';

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
          <Route path='/Champion/:name/:tab/:ability?' element={<ChampDetails />} /> 
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;