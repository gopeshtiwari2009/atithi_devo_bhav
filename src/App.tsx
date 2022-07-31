import { Grid, makeStyles, Paper } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';


export interface Monster {
  id: string;
  name: string;
  email: string;
}

export interface GridItemProps {
  monster: Monster;
}

function GridItem({ monster }: GridItemProps) {
  return (
    // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
    // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
    // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
    <Grid item xs={6} sm={3} md={3}>
          <img className='image' src='https://www.w3schools.com/howto/img_avatar.png'></img>
          <h3>{monster.name}</h3>
          <div>{monster.email}</div>
    </Grid>
  );
}

function App() {

  const [isLoading, setIsLoading] = useState(true);
  const initialMonsters: Monster[] = [];
  const [monsters, setMonsters] = useState(initialMonsters);
  const [searchKey, setSearchKey] = useState('');
  let filteredArray = monsters;
  filteredArray = monsters.filter((monster => monster.name.toLocaleLowerCase().includes(searchKey)));

  const onSearchKeyChanged = (event: ChangeEvent<HTMLInputElement>) => setSearchKey(event.target.value.toLocaleLowerCase());

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      setIsLoading(false);
      setMonsters(users);
    })
  }, [searchKey]);

  return (
    <div className="App">
      <header>
        <h1>Atithi Devi Bhav</h1>
      </header>
      {filteredArray && filteredArray.length && <input type="search" placeholder="search monsters" onChange={onSearchKeyChanged}></input>}
      {isLoading && <h3>Loading...</h3>}
      <Grid container spacing={0}>
      {filteredArray && filteredArray.length && filteredArray.map((monster, index) => {
        return <GridItem key={index} monster={monster} />
      })}
      </Grid>
    </div>
  );
}

export default App;
