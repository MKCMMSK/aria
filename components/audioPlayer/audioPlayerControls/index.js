import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import PlayButton from './playButton';

const AudioPlayerControls = (props) => {
  
  const togglePlayHandler = () => {
    if (props.isPlaying) {
    props.onPause();
    } else {
    props.onPlay();
    }
  };

  return (
    <div className='playerControls playerIcon'>
      <PlayButton togglePlayHandler={ togglePlayHandler } isPlaying={ props.isPlaying } />
    </div>
  );
};

AudioPlayerControls.PropTypes = {
    onPause: PropTypes.func.isRequired,
    onPlay: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentTrack: PropTypes.object.isRequired,
};

export default AudioPlayerControls;