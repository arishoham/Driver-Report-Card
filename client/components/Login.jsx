import React, {useState} from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
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
          setUsername('');
          setPassword('');
          setStatus('');
          //Todo: Route user to site <--------------------------
        } else {
          setStatus('Incorrect username or password');
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


  return (
    <main>
      <h2>Sign in!</h2>
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
        <input type="submit" value="Submit" />
      </form>
      <div>{status}</div>
    </main>
  );
}