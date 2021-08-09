import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

function LoginView(props) {
  const [ Username, setUsername ] = useState('');
  const [ Password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(Username, Password);
    //props.onLoggedIn(Username);
  axios.post('https://my-movie-api-20123.herokuapp.com/login', {
    Username: Username,
    Password: Password
  })
  .then(response => {
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user')
  });
  };

  return (
    <Container fluid>
    <Form className="LoginForm">
      <Row>
        <Col>
          <Form.Group calssName="postion-relative mb-3" controlId="formGroupUsername">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" placeholder="Enter Name" value={Username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" placeholder="Enter Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <div>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button variant="secondary" href="/register" >Registration</Button>
      </div>
    </Form>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};

export default LoginView;
