import { Route, Routes, BrowserRouter, Link, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { getChamps } from './API-Utility/APIcalls';
import AllChamps from './Pages/AllChamps/AllChamps';
import ChampDetails from './Pages/ChampDetails/ChampDetails';
import ErrorPage from './Pages/Error/ErrorPage';

function App() {
  const [champData, setChampData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getChamps(navigate)
      .then((data) => setChampData(Object.values(data.data)))
      .catch(error => console.log(error));
  }, [navigate]);

  return (
    <main className="App">
      <header className="header">
        <Link to="/" className="header-link" aria-label='back-to-home'>
          <h1>ChampionHub</h1>
        </Link>
      </header>
      <Routes>
        <Route path='/' element={<AllChamps champData={champData} />} />
        <Route path='/:name/:tab/:ability?' element={<ChampDetails />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to="/error" state={{ message: 'Invalid URL', details: 'The URL you are trying to access does not exist or is malformed.', type: '404' }} />} />
      </Routes>
    </main>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;