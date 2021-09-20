import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Card, CardDeck, Form, Row } from 'react-bootstrap';
import './profile-view.scss';
import { connect } from 'react-redux';

import { setUser } from '../../actions/actions';

class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }


  // get user method
  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://my-movie-api-20123.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      this.props.setUser(response.data);

      
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  removeFavouriteMovie() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');


    axios
      .delete(`https://my-movie-api-20123.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      

      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    let username = localStorage.getItem('user');

    axios.put(`https://my-movie-api-20123.herokuapp.com/users/${username}`, {
       
      Username: newUsername,
      Password: newPassword,
      Email: newEmail,
      Birthday: newBirthday,
    }, {
      headers: { Authorization: `Bearer ${token}` },
      
    })
      .then((response) => {
        alert('Saved Changes');
        
          this.props.setUser(response.data);
    
          
       
        localStorage.setItem('user', this.props.user.Username);
        username = localStorage.getItem('user')
        window.location.pathname=`/users/${username}`
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  

  setUsername(event) {
    
      this.Username = event
  
}

  setPassword(event) {
   
      this.Password = event
  
}

  setEmail(event) {
      this.Email = event
  
}

  setBirthday(event) {
  
      this.Birthday = event

}

  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete(`https://my-movie-api-20123.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('Your account has been deleted.');
        window.open(`/`, '_self');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Row className="profile-view">
        <Card className="profile-card">
          <h2>Your Favorites Movies</h2>
          <Card.Body>
            {FavoriteMovies.length === 0 && <div className="text-center">Empty.</div>}

            <div className="favorites-movies ">
              {FavoriteMovies.length > 0 &&
                movies.map((movie) => {
                  if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                    return (
                       <h1>{movie.Title}</h1>
                      
                    );
                  }
                })}
            </div>
          </Card.Body>

          <h1 className="section">Update Profile</h1>
          <Card.Body>
            <Form  className="update-form" onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>

              

              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control type="text" placeholder="Change Username" onChange={(event) => this.setUsername(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">
                  Password<span className="required">*</span>
                </Form.Label>
                <Form.Control type="password" placeholder="New Password" onChange={(event) => this.setPassword(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Change Email" onChange={(event) => this.setEmail(event.target.value)} />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control type="date" placeholder="Change Birthday" onChange={(event) => this.setBirthday(event.target.value)} />
              </Form.Group>

              <Button variant='danger' type="submit"  >
                Update
              </Button>

              <h3>Delete your Account</h3>
              <Card.Body>
                <Button variant='danger' onClick={(e) => this.handleDeleteUser(e)}>
                  Delete Account
                </Button>
              </Card.Body>
            </Form>

          </Card.Body>
        </Card>
      </Row >
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser })(ProfileView);

