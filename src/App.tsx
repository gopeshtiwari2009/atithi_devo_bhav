import React, { useState } from 'react';
import './App.css';

export interface Monster {
  id: string;
  name: string;
}

function App() {
 
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => {
    setIsLoading(false);
    setMonsters(users);
  })
  const [isLoading , setIsLoading] = useState(true);
  const initialMonsters: Monster[] = [];
  const [monsters, setMonsters] = useState(initialMonsters);
  const [searchKey, setSearchKey] = useState('');
  return (
    <div className="App">
      <header>
        <h1>Atithi Devi Bhav</h1>
      </header>     
      {monsters && monsters.length && <input onChange={(event) => setSearchKey(event.target.value)}></input>}
      {isLoading && <h3>Loading...</h3>}
      {monsters && monsters.length && monsters.filter(item => item?.name?.toLowerCase().includes(searchKey.toLowerCase())).map((monster, index) => {
        return <h3 key={index}>{monster?.name}</h3>;
      })}
    </div>
  );
}

export default App;
