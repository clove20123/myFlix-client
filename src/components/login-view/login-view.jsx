import React, { useState } from 'react';

export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);

    props.onLoggedIn(Username);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </form>
  );
}


