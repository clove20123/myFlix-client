import React from 'react';
import PropTypes from 'prop-types';
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
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};

export default DirectorView;