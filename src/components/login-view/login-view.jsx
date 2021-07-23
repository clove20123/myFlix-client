import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password);

    props.onLoggedIn(Username);
  };

  return (
    <Form className="LoginForm">
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value={Username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <div>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </Form>
  );
}


