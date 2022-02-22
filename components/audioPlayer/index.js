import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import AudioPlayerControls from './audioPlayerControls';
import AudioInfo from './audioPlayerControls/audioInfo';

const AudioPlayer = (props) => {
  const appName = 'prototype'
  const [currentTrack, setCurrentTrack] = useState({title: '', artist: ''});
  const [volume, setVolume] = useState(0.6);
  const audioPlayerRef = useRef({});

  //Grab a track and set the current track state, app name can be arbitrary
  let fetchData = () => {
    const track = `https://audius-discovery-1.altego.net/v1/tracks/${props.trackToPlay}?app_name=${appName} `;

    fetch(track)
    .then((response) => response.json())
    .then((responseJson) => {
        let track = responseJson.data;
        setCurrentTrack({ title:  track.title, artist: track.user.name});
    });
  };

  const streamTrack = `https://audius-discovery-1.altego.net/v1/tracks/${props.trackToPlay}/stream?app_name=${appName}`;

  //currently only plays one track, should run everytime a new track to play is set, need to set it on app level
  useEffect(() => {
    fetchData();
  }, [props.trackToPlay])

  return (
    <>
      <ReactAudioPlayer
        src={streamTrack}
        controls
        volume={volume}
        style={{ display: 'none' }}
        ref={(el) => {
        audioPlayerRef = el;}}
      />
    </>
  );
}

AudioPlayer.propTypes = {
  trackToPlay: PropTypes.string.isRequired,
  display: PropTypes.string,
};

export default AudioPlayer;
