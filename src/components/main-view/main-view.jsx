import React from 'react';
import axios from 'axios';
import './main-view.scss';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  getMovies(token){
    axios.get('https://my-movie-api-20123.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
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
    const { movies, selectedMovie, user } = this.state;

    
    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>

        /* Start Main View*/

        <Row className="main-view justify-md-content-center">
          <Route exact path="/" render={() => {
            if (!user) return (
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            );
            if (movies.length === 0) return (<div className="main-view" />);

            return (
              <>
                <Row className="m-3 navigation-main"><NavBar user ={user} /></Row>
                <MoviesList movies={movies} />
                </>
            )
          }} />

          /* Register View*/
          <Route path="/register" render={() => {
            if (user) return <Redirect to='/' />
            return <Row>
              <Col>
                <RegistrationView user={user} />
              </Col>
            </Row>
          }} />

          /* Movie View */
          <Route path="/movies/:Title" render={({ match, history }) => {
            if (!user) return <Row>
              <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            </Row>
          return <>
            <Row>
              <Col md={8}>
                <MovieView movie={movies.find(m => m.Title.params.Title)} onBackClick={() => history.goBack()} />
              </Col>
            </Row>
          </>
          }} />

          /* Genre View */
          <Route exact path="/genres/:name" render={({ match, history }) => {
                if (!user) return <Row>
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                if (movies.length === 0) return <div className="main-view" />;
                return <>
                    <Row className="m-3 navigation-main">
                      <Col>
                        <NavBar user={user} />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8}>
                        <GenreView genre={movies.find(m => m.genre.name === match .params.name).genre} onBackClick={() => history.goBack()} movies={movies} />
                      </Col>
                    </Row>
                </>
              }} />

          /* Director View*/

          <Route path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return 
              <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
              </Col>
              }} />

          /* Profile View */

          <Route path="/users/:Username" render={({ history }) => {
              {/* if(!user) return <Redirect to="/" /> */}
              if (movies.length === 0) return <div className="main-view" />
              if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
              
              return (
                <>
                  <Row className="m-3 navigation-main">
                    <Col>
                      <NavBar user={user} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                    </Col>
                  </Row>
                </>
              )
            }} />
        </Row>
      </Router>
    );
  }
}

export default MainView;