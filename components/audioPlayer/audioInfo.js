import React from 'react';
import PropTypes from 'prop-types';

const AudioInfo = (props) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <p className="artistLink"><a  target="_blank" rel="noopener noreferrer">{props.trackTitle}</a></p>
      <p className="trackLink"><a  target="_blank" rel="noopener noreferrer">{props.trackArtist}</a></p>
    </div>
  );
};

AudioInfo.propTypes = {
  trackTitle: PropTypes.string,
  trackArtist: PropTypes.string
};

export default AudioInfo;
