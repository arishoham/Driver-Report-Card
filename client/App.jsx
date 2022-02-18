import React, {useState, useMemo} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CarContainer from './components/CarContainer';
import Nav from './components/Nav';

export default function App() {
  const [loggedIn, setLoggedIn] = useState('');
  const [carData, setCarData] = useState({comments:[],carInfo:{}});
  const [mode, setMode] = useState('light');
  
  const refreshComments = (homepage = false) => {
    if(homepage) setCarData({comments:[],carInfo:{}});
    else {
      const {pn, ps} = carData.carInfo;
      const url = `/api/?pn=${pn}&ps=${ps}`;
      fetch(url)
        .then(data => data.json())
        .then(data => {
          setCarData(data);
        });
    }
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    // <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Nav {...{loggedIn, setLoggedIn, refreshComments}} 
        darkMode={colorMode.toggleColorMode}
        whichTheme={theme.palette.mode}
      />
      <CarContainer {...{loggedIn, carData, setCarData, refreshComments}}/>
    </ThemeProvider>
    // </ColorModeContext.Provider>
  );
}