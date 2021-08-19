import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import propTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from 'axios';

class MovieView extends React.Component {

keypressCallback(event) {
  console.log(event.key);
}

componentDidMount() {
  document.addEventListener('keypress', this.keypressCallback);
}

componentWillUnmount() {
  document.removeEventListener('keypress', this.keypressCallback);
}

addFavorite(movie) {
let token = localStorage.getItem('token');
axios.post(`https://my-movie-api-20123.herokuapp.com/users/${localStorage.getItem('user')}/Movies/${movie._id}`,{},  {
headers: { Authorization: `Bearer ${token}` }
})
.then(response => {
  console.log(response.data)
})
.catch((e) => {
  console.log(e);
})}

render() {
  const { movie, onBackClick } = this.props;


  return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movie.ImageURL} />
      </div>
      <div className="movie-title">
        <h1>
          <Badge bg="primary">
            <span className="value">{movie.Title}</span>
          </Badge></h1>
      </div>
      <div className="movie-description">
        <span className="value">{movie.Description}</span>
      </div>
      <div className="movie-genre">
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre: </Button>
        </Link>
        <span className="value">{movie.Genre.Name}</span>
      </div>
      <div className="movie-director">
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director: </Button>
        </Link>
        <span className="value">{movie.Director.Name}</span>
      </div>
      <Button variant='danger' className="fav-button" value={movie._id} onClick={ ( ) => this.addFavorite(movie)}>
        Add to Favorites
      </Button>
      <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>
    </div>
  );
}
}


MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Featured: propTypes.bool,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired
    }),
  }),
  onBackClick: propTypes.func.isRequired
};

export default MovieView;