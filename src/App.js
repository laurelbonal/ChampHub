import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import { useEffect, useState } from 'react';
import getChamps from './APIcalls'; 
import AllChamps from './AllChamps';

function App() {
  const [champData, setChampData] = useState([]);

  useEffect(() => {
    getChamps()
      .then((data) => setChampData(Object.values(data.data))) // Convert to array of objects
      .catch(error => console.log(error));
  }, []);

  return (
    <BrowserRouter>
      <main className="App">
        <header className="App-header">ChampionHub</header>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/Champions' element={<AllChamps champData={champData} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;