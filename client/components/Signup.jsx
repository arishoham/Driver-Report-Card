import React, { useState} from 'react';

export default function Signup({handleSubmitSignup, handleChangeUsername, handleChangePassword, handleChangeEmail, status}) {

  return (
    <main>
      <h2>Sign up!!!!!!!!</h2>
      <form onSubmit={handleSubmitSignup}>
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