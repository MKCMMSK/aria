import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-background-video-player';
import { useWindowSize } from '../../hooks/useWindowSize';

const BackgroundSceneList = forwardRef((props, ref) => {
  // store list of scenes for the current video set
  const [sceneList, setSceneList] = useState([]);
  const windowSize = useWindowSize();
    
  // creates an array of scenes from a video set, removing any empty scenes
  const listScenes = () => (
    Object.keys(props.videoSrc[props.currentVideoIndex].scenes)
      .filter(scene => props.videoSrc[props.currentVideoIndex].scenes[scene] !== null)
  );

  const createKeyValuePairRef = (element) => {
      if (element && element.container !== null){
        ref.current[element.container.className.replace('BackgroundVideo ', '')] = element.container;
      } 
  } 

  useEffect(() => {
    setSceneList(listScenes());
  }, [props.currentVideoIndex]);
  
  // show mobile videos is screen width is less than 855px (Galaxy S1 Ultra viewport)
  const videoSuffix = windowSize.width < 855 ? 'mp4-mobile.mp4' : 'mp4.mp4';

  if (sceneList && sceneList.length > 0) {
    return (
      <div style={{ position: 'absolute', width: ' 100%', height: '100%' }}>
        {
          sceneList.map((scene, index) => {
            if (scene) {
              return (
                <VideoPlayer 
                  ref={el => {
                    createKeyValuePairRef(el)
                  }} 
                  autoPlay={false}
                  className={`${scene}_${props.currentVideoIndex}`}
                  containerHeight={windowSize.height}
                  containerWidth={windowSize.width}
                  key={`${scene}_${props.currentVideoIndex}`}
                  loop={false}
                  muted
                  src={[{ src: `${props.videoSrc[props.currentVideoIndex].scenes[scene]}${videoSuffix}`, type: 'video/mp4' }]}
                  style={{ display: 'none' }}
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

const detectVideoIndexChange = (prevProps, nextProps) => {
  if (nextProps.currentVideoIndex == prevProps.currentVideoIndex) {
    return true;
  } else {
    return false;
  }
}

export default React.memo(BackgroundSceneList, detectVideoIndexChange);