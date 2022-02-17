import React, {useState, useEffect} from 'react';
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import Signup from './Signup';
import Login from './Login';

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