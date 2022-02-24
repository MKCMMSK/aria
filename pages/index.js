import React, { useState, useEffect } from 'react';
// import styles from '../styles/Home.module.css'
import BackgroundVideoPlayer from '../components/backgroundVideo';
import AudioPlayer from '../components/audioPlayer';

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [trackToPlay, setTrackToPlay] = useState('ByZxx');
  const videoSrc = [
    {
      scenes: {
        enter: 'https://streamable.com/l/idiuej/',
        mainLoop: 'https://streamable.com/l/uqz91y/',
        mainLoopToSubLoop: 'https://streamable.com/l/akzkwp/',
        subLoop: 'https://streamable.com/l/1uvga7/',
        subLoopToMainLoop: 'https://streamable.com/l/q17ur9/',
        exitNext: 'https://streamable.com/l/3zec69/',
      },
      mainLoopMaxLoops: 6,
      mainLoopMinLoops: 3,
      subLoopMaxLoops: 6,
      subLoopMinLoops: 3,
      nftUrl: null,
    },
    {
      scenes: {
        enter: 'https://streamable.com/l/yl025m/',
        mainLoop: 'https://streamable.com/l/xsh8z4/',
        mainLoopToSubLoop: 'https://streamable.com/l/u81hvk/',
        subLoop: 'https://streamable.com/l/8zsfpm/',
        subLoopToMainLoop: 'https://streamable.com/l/61fetd/',
        exitPrev: 'https://streamable.com/l/p9nfo9/',
      },
      mainLoopMaxLoops: 6,
      mainLoopMinLoops: 3,
      subLoopMaxLoops: 6,
      subLoopMinLoops: 3,
      nftUrl: null,
    },
  ];

  const changeVideoIndex = (videoIndex) => {
    setCurrentVideoIndex(videoIndex);
  };

  return (
    <>
      <AudioPlayer trackToPlay={trackToPlay}/>
      <BackgroundVideoPlayer
        videoSrc={videoSrc}
        changeVideoIndex={changeVideoIndex}
        currentVideoIndex={currentVideoIndex}
      />
    </>
  )
}
