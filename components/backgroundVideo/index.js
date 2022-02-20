import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import BackgroundSceneList from './backgroundVideoSceneList';

const BackgroundVideoPlayer = (props) => {
  // store values for the current scene being displayed
  const [currentScene, setCurrentScene] = useState({
    name: 'enter',
    player: 'enter_0',
    posterSrc: undefined,
    prevPlayer: undefined,
  });

  // store number of loops for looping scene
  const [loopCount, setLoopCount] = useState(0);

  //storing refs of each video player container using player as a key for the pair eg. 'enter_0' : <div>
  const videoPlayerRef = useRef({});

    return (
        <BackgroundSceneList
            ref={videoPlayerRef}
            currentVideoIndex={props.currentVideoIndex}
            videoSrc={props.videoSrc} 
        />
    )
};

export default BackgroundVideoPlayer;