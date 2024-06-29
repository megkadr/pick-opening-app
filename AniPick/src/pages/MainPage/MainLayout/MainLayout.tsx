import { useState, useEffect, useRef } from 'react';
import Style from "./MainLayout.module.css";
import AnimeCard from "./AnimeCard/AnimeCard";
import video1 from "../../../assets/videos/kaiju.mp4";
import video2 from "../../../assets/videos/mashle.mp4";
import video3 from "../../../assets/videos/solo_leveling.mp4";
import backgroundTransition from "../../../assets/images/todo_background.png";
import clapAudio from "../../../assets/audio/clap.mp3";

const VIDEOS = [
  { src: video1, title: "kaiju" },
  { src: video2, title: "mashle" },
  { src: video3, title: "solo_leveling" },
  { src: video1, title: "kaiju" },
  { src: video2, title: "mashle" },
  { src: video3, title: "solo_leveling" },
];

const VIDEOS2 = [
  { src: video3, title: "kaiju" },
  { src: video2, title: "mashle" },
  { src: video1, title: "solo_leveling" },
  { src: video3, title: "kaiju" },
  { src: video2, title: "mashle" },
  { src: video1, title: "solo_leveling" },
];

export default function MainLayout() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(VIDEOS);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const clapAudioRef = useRef<HTMLAudioElement>(new Audio(clapAudio));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  // eslint-disable-next-line prefer-const
  let [batchNumber, setBatchNumber] = useState<number>(0);

  useEffect(() => {
    if (isPlaying) {
      const currentVideo = videoRefs.current[currentVideoIndex];
      if (currentVideo) {
        currentVideo.play().catch(error => {
          console.error("Error playing video:", error);
        });
        currentVideo.onended = () => {
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
    setShowButton(false);
    if (!isPlaying) {
      if (batchNumber !== 1) {
        setBatchNumber(batchNumber++);
        setIsTransitioning(true);
        setShowBackground(true);
        setShowButton(false);
        playClapSound();
        setTimeout(() => {
          setCurrentSet(VIDEOS2);
          setCurrentVideoIndex(0);
          setIsPlaying(true);
          setIsTransitioning(false);
          setShowBackground(false);
        }, 1000);
      } else {
        console.log("Game ended");
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
        clapAudioRef.current.play().catch(error => {
        console.error("Error playing clap sound:", error);
      });
    }
  };

  return (
    <div className={Style.mainLayout}>
      <div className={Style.mainContent}>
        <div className={Style.year}><p className={Style.yearNumber}>2020</p></div>
        <div className={Style.quizTitle}><h1>ONLY SAVE 1 OPENING!</h1></div>
      </div>
      <div className={`${Style.cardPicks} ${isTransitioning ? Style['fade-out'] : Style['fade-in']}`}>
        <div className={`${Style.cardPicksBackground} ${showBackground ? Style.show : ''}`} style={{ display: showBackground ? 'block' : 'none' }}><img className={Style.backgroundTransition} src={backgroundTransition} alt="background transition"/></div>
        {showButton && (
          <button className={Style.playButton} onClick={() => handleButtonClick()}>Play</button>
        )}
        {!showButton && (
          currentSet.map((video, index) => (
            <AnimeCard
              key={index}
              src={video.src}
              title={video.title}
              onClick={() => handleCardClick(index)} // Pass index to identify which card was clicked
              ref={el => videoRefs.current[index] = el}
              className={Style.cardItem}
            />
          ))
        )}
      </div>
    </div>
  );
}