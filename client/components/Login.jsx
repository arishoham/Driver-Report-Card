import React, {useState} from 'react';

export default function Login({handleSubmitLogin, handleChangeUsername, handleChangePassword, status}) {

  return (
    <main>
      <h2>Sign in!</h2>
      <form onSubmit={handleSubmitLogin}>
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