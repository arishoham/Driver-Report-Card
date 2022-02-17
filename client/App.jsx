import React, {useState} from 'react';
import CarContainer from './components/CarContainer';
import Nav from './components/Nav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState('');
  return (
    <div>
      <Nav {...{loggedIn, setLoggedIn}}/>
      <CarContainer {...{loggedIn}}/>
    </div>
  );
}