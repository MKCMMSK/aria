import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-background-video-player';

const BackgroundSceneList = ((props) => {
  // store list of scenes for the current video set
  const [sceneList, setSceneList] = useState([]);

  if (sceneList && sceneList.length > 0) {
    return (
      <div style={{ position: 'absolute', width: ' 100%', height: '100%' }}>
        {
          sceneList.map((scene) => {
            if (scene) {
              return (
                <VideoPlayer 
                  autoPlay={false}
                  containerHeight={windowSize.height}
                  containerWidth={windowSize.width}
                  key={`${scene}`}
                  loop={false}
                  muted
                  src={[{ src: `${props.videoSrc[props.currentVideoIndex].scenes[scene]}${videoSuffix}`, type: 'video/mp4' }]}
                />
              );
            }
          })
        }
      </div>
    );
  } else {
    return (
      <div style={{ position: 'absolute', width: ' 100%', height: '100%' }}></div>
    );
  }
});

BackgroundSceneList.propTypes = {
  currentVideoIndex: PropTypes.number.isRequired, 
  videoSrc: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};