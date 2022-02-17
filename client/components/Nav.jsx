import React, {useState, useEffect} from 'react';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import Signup from './Signup';
import Login from './Login';

const Nav = () => {
  const [account, setAccount] = useState(''); //signup or signin
  const [loggedIn, setLoggedIn] = useState(''); //'' or username

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

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
      <nav>
        <Icon path={mdiMenu}
          title="User Profile"
          size={2}
        />
        <div id="title">Driver Report Card</div>
        {loggedIn === '' 
          ?  <div>
            <a onClick={()=>setAccount('signup')}>Sign up</a> |{' '}
            <a onClick={()=>setAccount('login')}>Log in</a>
          </div>

          : <div><a onClick={handleLogout}>Log out</a></div>
        }
      </nav>
      { account === 'signup' && <Signup /> }
      { account === 'login' && <Login /> }
    </>
  );
};

export default Nav;