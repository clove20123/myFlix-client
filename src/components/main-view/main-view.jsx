import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
//import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
//import { NavBar } from '../navbar-view/navbar-view';



import { Row, Col, Form, Navbar, Nav, Button, Container } from 'react-bootstrap';




class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      
      
    };
  }

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    //if(accessToken !== null){
      //if(!("Username" in this.props.user)){
        this.props.setUser(localStorage.getItem('user'));
      //}
    //}
    this.getMovies(accessToken);
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(
     authData.user.Username
    );
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser(
      null
    );
    console.log("logout successful");
    window.open("/", "_self");
  }


  getMovies(token){
    axios.get('https://my-movie-api-20123.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);

      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  onRegister(register) {
    this.setState({
      register,
    });
  }

  render() {
    

    let { movies } = this.props;
    let { user } = this.props;
    return (
      
      <Router>
         <header>
          <Navbar bg="dark" expand="lg" fixed="top" variant='dark'>
            <Navbar.Brand className='home' as={Link} to={`/`} target='_self'>myFlix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link className='home' as={Link} to={`/`} target='_self'>Home</Nav.Link>
                  {user &&
                <Nav.Link className='profile' as={Link} to={`/users/${user}`} target='_self'>Profile</Nav.Link>
                  }
              </Nav>
              <Form inline>
                {user &&
                  <Link to={`/`}>
                    <Button variant="dark" className='logout-button' onClick={() => this.onLogout()}>Logout</Button>
                  </Link>
                }
              </Form>
              </Navbar.Collapse>
          </Navbar>
        </header> 
        <Container fluid>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies}/>;
           
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView movie={movies.find(m => m.Director.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView movie={movies.find(m => m.Genre.Name === match.params.name)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path='/users/:username' render={({ history }) => {
            if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />

        </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies:state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser } ) (MainView);