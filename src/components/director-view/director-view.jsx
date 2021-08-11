import React from 'react';
import propTypes from 'prop-types';
import { Button, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './director-view.scss';

class DirectorView extends React.Component {
  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="director-view">

        <div className="director-name">
          <h1>
            <span className="value">{movie.Director.Name}</span>
          </h1>
        </div>
        <div className="director-bio">
          <span className="value">{movie.Director.Bio}</span>
        </div>

        <div className="director-birthdate">
          <span className="value">{movie.Director.Birth}</span>
        </div>

        <Button variant="primary" onClick={() => { onBackClick(null); }}>Back</Button>

      </div>
    );
  }
}

DirectorView.propTypes = {
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

export default DirectorView;