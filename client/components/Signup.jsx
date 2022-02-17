import React, { useState} from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
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
          setUsername('');
          setPassword('');
          setEmail('');
          setStatus('');
          //Todo: Route user to site <--------------------------
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


  return (
    <main>
      <h2>Sign up!!!!!!!!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          username: 
          <input 
            type="text" 
            name="username" 
            onChange={handleChangeUsername} 
          />
        </label>
        <label>
          password: 
          <input 
            type="password" 
            name="password" 
            onChange={handleChangePassword} 
          />
        </label>
        <label>
          email: 
          <input 
            type="email" 
            name="email" 
            onChange={handleChangeEmail} 
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>{status}</div>
    </main>
  );
}