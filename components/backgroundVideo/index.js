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

  // set the number of times to loop main loop or sub loop
  const setLoop = (loopType) => {
    let max;
    let min;

    if (loopType === 'main') {
    max = props.videoSrc[props.currentVideoIndex]["mainLoopMaxLoops"] || 3;
    min = props.videoSrc[props.currentVideoIndex]["mainLoopMinLoops"] || 3;
    } else if (loopType === 'sub') {
    max = props.videoSrc[props.currentVideoIndex]["subLoopMaxLoops"] || 3;
    min = props.videoSrc[props.currentVideoIndex]["subLoopMinLoops"] || 3;
    } else {
    max = 3;
    min = 3;
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    setLoopCount(Math.floor(Math.random() * (max - min + 1) + min));  
  };
  
  // advances to the next scene when each video ends
  const handleVideoEnd = (event) => {
    event.preventDefault();
    event.srcElement.removeEventListener('ended', handleVideoEnd);  // cleanup event handler

    switch (currentScene.name) {
      case "enter": {
        // set number of loops for main loop
        setLoop('main');
  
        setCurrentScene({ 
          name: 'mainLoop',
          player: `mainLoop_${props.currentVideoIndex}`,
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;        
      }

      case "mainLoop": {
        // in video sets where mainLoopToSubLoop scene does not exist, continue the mainLoop by resetting the loopCount  
        let transitionPlayer = videoPlayerRef.current['mainLoopToSubLoop_0'] ? videoPlayerRef.current['mainLoopToSubLoop_0'].firstChild : null; 
        if  (!transitionPlayer) {
          setLoop('main');
        }

        // advance to mainLoopToSubLoop
        setCurrentScene({ 
          name: 'mainLoopToSubLoop',
          player: `mainLoopToSubLoop_${props.currentVideoIndex}`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        }); 
        break;    
      }

      case "mainLoopToSubLoop": {
        // set number of loops for sub loop
        setLoop('sub');
        
        setCurrentScene({ 
          name: 'subLoop',
          player: `subLoop_${props.currentVideoIndex}`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;
      }

      case "subLoop": {
        // loop as many times as specified in loopCount
        setCurrentScene({ 
          name: 'subLoopToMainLoop',
          player: `subLoopToMainLoop_${props.currentVideoIndex}`,
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;
      }

      case "subLoopToMainLoop": {
        // set number of loops for main loop
        setLoop('exitNext'); 

        setCurrentScene({ 
          name: 'exitNext',
          player: `exitNext_${props.currentVideoIndex}`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;        
      }
      case "exitNext": {
        // set number of loops for main loop
        setLoop('enter'); 

        setCurrentScene({ 
          name: 'enter',
          player: `enter_0`,  
          posterSrc: null,
          prevPlayer: currentScene.player
        });
        break;        
      }
    }
  }

    return (
        <BackgroundSceneList
            ref={videoPlayerRef}
            currentVideoIndex={props.currentVideoIndex}
            videoSrc={props.videoSrc} 
        />
    )
};

BackgroundVideoPlayer.propTypes = {
  changeVideoIndex: PropTypes.func.isRequired,
  className: PropTypes.any,
  currentVideoIndex: PropTypes.number.isRequired,
  videoSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default BackgroundVideoPlayer;