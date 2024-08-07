/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect, useRef } from 'react';
import Style from "./MainLayout.module.css";
import AnimeCard from "./AnimeCard/AnimeCard";
import YearDisplay from './YearDisplay/YearDisplay';
import AudioVisualizer from '../../../components/AudioVisualizer/AudioVisualizer';
import backgroundTransition from "../../../assets/images/todo_background.png";
import endingCharacter from "../../../assets/images/ending-character.png";
import clapAudio from "../../../assets/audio/clap.mp3";
import { getOpeningsByYear } from '../../../utils/RequestServices/OpeningsService';
import { addUserOpening  } from '../../../utils/RequestServices/UserService';
import { Opening } from '../../../assets/DTO/Opening';
import { useAuthStore } from '../../../utils/contextStore/authStore';
import { UserOpeningModel } from '../../../assets/DTO/UserOpeningModel';

const MainLayout = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [year, setYear] = useState(2000);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const clapAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [showTitles, setShowTitles] = useState<boolean[]>(Array(6).fill(false));
  const currentYear = new Date().getFullYear();
  const user = useAuthStore(state => state.user);
  
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
          if (currentVideoIndex < openings.length - 1) {
            setCurrentVideoIndex(prevIndex => prevIndex + 1);
          } else {
            setIsPlaying(false);
          }
        };
      }
    }
  }, [currentVideoIndex, isPlaying, openings]);

  useEffect(() => {
    console.log("Updated openings");
  }, [openings]);

  const fetchOpenings = async (year: number) => {
    try {
      const data = await getOpeningsByYear(year);
      setOpenings(data);
    } catch (error) {
      console.error("Error fetching openings:", error);
    }
  };

  const playClapSound = () => {
    if (clapAudioRef.current) {
      clapAudioRef.current.load();
      clapAudioRef.current.play().catch(error => {
        console.error("Error playing clap sound:", error);
      });
    }
  };

  const handleCardClick = async (index: number) => {
    if (!isPlaying) {
      const newYear = year + 1;
      if (newYear !== currentYear+1) {
        playClapSound();
        setCurrentVideoIndex(0);
        setShowTitles(Array(6).fill(false)); // Reset titles for new batch
        setIsTransitioning(true);
        setShowBackground(true);
        // Send UserClaims to the backend
        if(user) {
          const userId = user.id; // Assuming the user object has an 'id' property
          const openingId = index; // This should be the id of the selected opening
          const request: UserOpeningModel = {
            userId,
            openingId,
            year,
          };
          try {
            await addUserOpening(request);
          } catch (error) {
            console.error('Error sending UserClaims to backend:', error);
          }
        }
        setYear(newYear);
        await fetchOpenings(newYear);
        setTimeout(() => {
          setIsPlaying(true);
          setIsTransitioning(false);
          setShowBackground(false);
        }, 1000);
      } else {
        setShowButton(false);
        setShowEnding(true);
      }
    }
  };

  const handleButtonClick = async () => {
    setShowButton(false);
    setIsTransitioning(true);
    setShowBackground(true);
    playClapSound();
    await fetchOpenings(year);
    setTimeout(() => {
      setIsPlaying(true);
      setIsTransitioning(false);
      setShowBackground(false);
    }, 1000);
  };

  return (
    <div className={Style.mainLayout}>
      <div className={Style.mainContent}>
        <YearDisplay year={year} />
        {isPlaying ? (
          <AudioVisualizer />
        ) : (
          <div className={Style.quizTitle}><h1>ONLY SAVE 1 OPENING!</h1></div>
        )}
      </div>
      <div className={`${Style.cardPicks} ${isTransitioning ? Style['fade-out'] : Style['fade-in']}`}>
        <div className={`${Style.cardPicksBackground} ${showBackground ? Style.show : ''}`} style={{ display: showBackground ? 'block' : 'none' }}>
          <img className={Style.backgroundTransition} src={backgroundTransition} alt="background transition"/>
        </div>
        <div className={`${Style.endingCharacterContener} ${showEnding ? Style.show : ''}`} style={{ display: showEnding ? 'flex' : 'none' }}>
          <img className={Style.backgroundTransition} src={endingCharacter} alt="background character"/>
        </div>
        {showButton && (
          <button className={Style.playButton} onClick={handleButtonClick}>Play</button>
        )}
        {!showButton && !showEnding && (
          openings.map((video, index) => (
            <AnimeCard
              key={index}
              src={video.src}
              openingNumber={video.openingNumber}
              title={video.title}
              onClick={() => handleCardClick(video.id)}
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
