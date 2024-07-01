import { useState, useEffect, useRef } from 'react';
import Style from "./MainLayout.module.css";
import AnimeCard from "./AnimeCard/AnimeCard";
import YearDisplay from './YearDisplay/YearDisplay';
import video1 from "../../../assets/videos/kaiju.mp4";
import video2 from "../../../assets/videos/mashle.mp4";
import video3 from "../../../assets/videos/solo_leveling.mp4";
import video4 from "../../../assets/videos/drifters.mp4";
import video5 from "../../../assets/videos/naruto.mp4";
import video6 from "../../../assets/videos/tanya_evil.mp4";
import backgroundTransition from "../../../assets/images/todo_background.png";
import clapAudio from "../../../assets/audio/clap.mp3";

const BATCHES = [
  [
    { src: video1, title: "kaiju", openingNumber: 1 },
    { src: video2, title: "mashle", openingNumber: 2 },
    { src: video3, title: "solo_leveling", openingNumber: 1 },
    { src: video4, title: "drifters", openingNumber: 1 },
    { src: video5, title: "naruto", openingNumber: 4 },
    { src: video6, title: "tanya_evil", openingNumber: 1 },
  ],
  [
    { src: video3, title: "kaiju", openingNumber: 1 },
    { src: video2, title: "mashle", openingNumber: 2 },
    { src: video1, title: "solo_leveling", openingNumber: 1 },
    { src: video4, title: "drifters", openingNumber: 1 },
    { src: video5, title: "naruto", openingNumber: 4 },
    { src: video6, title: "tanya_evil", openingNumber: 1 },
  ],
];

const MainLayout = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [year, setYear] = useState(2000);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const clapAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showTitles, setShowTitles] = useState<boolean[]>(Array(6).fill(false));

  const currentSet = BATCHES[currentBatchIndex];

  useEffect(() => {
    clapAudioRef.current = new Audio(clapAudio);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const currentVideo = videoRefs.current[currentVideoIndex];
      if (currentVideo) {
        currentVideo.play().catch(error => {
          console.error("Error playing video:", error);
        });
        currentVideo.onended = () => {
          setShowTitles(prev => {
            const newTitles = [...prev];
            newTitles[currentVideoIndex] = true;
            return newTitles;
          });
          if (currentVideoIndex < currentSet.length - 1) {
            setCurrentVideoIndex(prevIndex => prevIndex + 1);
          } else {
            setIsPlaying(false);
          }
        };
      }
    }
  }, [currentVideoIndex, isPlaying, currentSet]);

  const handleCardClick = (index: number) => {
    if (!isPlaying) {
      if (currentBatchIndex < BATCHES.length - 1) {
        setCurrentBatchIndex(prev => prev + 1);
        setShowTitles(Array(6).fill(false)); // Reset titles for new batch
        setIsTransitioning(true);
        setShowBackground(true);
        playClapSound();
        setYear(prevYear => prevYear + 1);
        setTimeout(() => {
          setCurrentVideoIndex(0);
          setIsPlaying(true);
          setIsTransitioning(false);
          setShowBackground(false);
        }, 1000);
      } else {
        console.log("End of batches");
      }
    }
  };

  const handleButtonClick = () => {
    setShowButton(false);
    setIsTransitioning(true);
    setShowBackground(true);
    playClapSound();
    setTimeout(() => {
      setIsPlaying(true);
      setIsTransitioning(false);
      setShowBackground(false);
    }, 1000);
  };

  const playClapSound = () => {
    if (clapAudioRef.current) {
      clapAudioRef.current.load();
      clapAudioRef.current.play().catch(error => {
        console.error("Error playing clap sound:", error);
      });
    }
  };

  return (
    <div className={Style.mainLayout}>
      <div className={Style.mainContent}>
        <YearDisplay year={year} />
        <div className={Style.quizTitle}><h1>ONLY SAVE 1 OPENING!</h1></div>
      </div>
      <div className={`${Style.cardPicks} ${isTransitioning ? Style['fade-out'] : Style['fade-in']}`}>
        <div className={`${Style.cardPicksBackground} ${showBackground ? Style.show : ''}`} style={{ display: showBackground ? 'block' : 'none' }}>
          <img className={Style.backgroundTransition} src={backgroundTransition} alt="background transition"/>
        </div>
        {showButton && (
          <button className={Style.playButton} onClick={handleButtonClick}>Play</button>
        )}
        {!showButton && (
          currentSet.map((video, index) => (
            <AnimeCard
              key={index}
              src={video.src}
              openingNumber={video.openingNumber}
              title={video.title}
              onClick={() => handleCardClick(index)}
              ref={el => videoRefs.current[index] = el}
              className={Style.cardItem}
              showTitle={showTitles[index]}
              videoNumber={index + 1}
            />
          ))
        )}
      </div>
      <audio ref={clapAudioRef} src={clapAudio} />
    </div>
  );
};

export default MainLayout;