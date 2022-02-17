import React, {useState, useEffect} from 'react';
import Signup from './Signup';
import Login from './Login';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Toolbar, Typography, IconButton } from '@mui/material';
import { end } from '@popperjs/core';

const Nav = ({loggedIn, setLoggedIn}) => {
  const [account, setAccount] = useState(''); //signup or signin

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if(data.status) {
          setAccount('');
          setLoggedIn(username);
          setUsername('');
          setPassword('');
          setStatus('');
        } else {
          setStatus('Incorrect username or password');
        }
      })
      .catch((err) => console.log('ERR', err));
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password, email})
    })
      .then((data) => data.json())
      .then((data) => {
        if(data.status) {
          setAccount('');
          setLoggedIn(username);
          setUsername('');
          setPassword('');
          setEmail('');
          setStatus('');
        } else {
          setStatus('Username or email already used');
        }
      })
      .catch((err) => console.log('ERR', err));
  };

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    fetch('/api/loggedin')
      .then(data => data.json())
      .then(data => {
        if(data.username) setLoggedIn(data.username);
        else setLoggedIn('');
      });
  }, []);

  const handleLogout = () => {
    fetch('/logout');
    setAccount('');
    setLoggedIn('');
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Driver Report Card
          </Typography>
          {loggedIn === '' 
            ?  <>
              <Button color="inherit" onClick={()=>setAccount('signup')}>Sign up</Button> {' '}
              <Button color="inherit" onClick={()=>setAccount('login')}>Log in</Button>
            </>

            : <><Button color="inherit" onClick={handleLogout}>Log out</Button></>
          }
        </Toolbar>
      </AppBar>
      { account === 'signup' && <Signup 
        {...{handleSubmitSignup, handleChangeUsername, handleChangePassword, handleChangeEmail, status}}
      /> }
      { account === 'login' && <Login 
        {...{handleSubmitLogin, handleChangeUsername, handleChangePassword, status}}
      /> }
    </>
  );
};

export default Nav;