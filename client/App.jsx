import React, {useState} from 'react';
import CarContainer from './components/CarContainer';
import Nav from './components/Nav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState('');
  const [carData, setCarData] = useState({comments:[],carInfo:{}});
  
  const refreshComments = () => {
    const {pn, ps} = carData.carInfo;
    const url = `/api/?pn=${pn}&ps=${ps}`;
    fetch(url)
      .then(data => data.json())
      .then(data => {
        setCarData(data);
      });
  };

  return (
    <div>
      <Nav {...{loggedIn, setLoggedIn, refreshComments}}/>
      <CarContainer {...{loggedIn, carData, setCarData, refreshComments}}/>
    </div>
  );
}