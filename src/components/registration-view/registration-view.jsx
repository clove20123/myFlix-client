import React, { useState } from 'react';
import './registration-view.scss';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
  };

  axios.post('https://my-movie-api-20123.herokuapp.com/users', {
    Username: username,
    Password: password,
    Email: email,
    Birthday: birthday
  })
  .then(response => {
    const data = response.data;
    console.log(data);
    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
  })
  .catch(e => {
    console.log('error registering the user')
  });

  return (
    <Form className="RegistrationForm" onSubmit={handleSubmit}>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} autoComplete="username" onChange={e => setUsername(e.target.value)} minLength="5" required />
        <Form.Control.Feedback type="invalid">Please provide a valid username at least 5 characters long.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={password} autoComplete="password" onChange={e => setPassword(e.target.value)} minLength="5" required />
        <Form.Control.Feedback type="invalid">Please provide a valid password at least 5 characters long.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" value={email} autoComplete="email" onChange={e => setEmail(e.target.value)} required />
        <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formGroupBirthdate">
        <Form.Label>Birthdate</Form.Label>
        <Form.Control type="date" placeholder="00-00-0000" value={birthdate} onChange={e => setBirthdate(e.target.value)} required />
        <Form.Control.Feedback type='invalid'>Please enter a valid birthday.</Form.Control.Feedback>
      </Form.Group>
      <span>
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
        {' '}
        <Link to="/">
          <Button variant="secondary" type="button">Back</Button>
        </Link>
      </span>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};