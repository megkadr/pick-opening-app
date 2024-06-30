import { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react';
import Style from "./AnimeCard.module.css";

interface AnimeCardProps {
  src: string;
  title: string;
  openingNumber: number;
  onClick: () => void;
  className?: string;
  showTitle: boolean;
  videoNumber: number; // New prop to pass the video number (1 to 6)
}

const AnimeCard = forwardRef<HTMLVideoElement, AnimeCardProps>(
  ({ src, title, openingNumber, onClick, className, showTitle, videoNumber }, ref) => {
    const innerRef = useRef<HTMLVideoElement>(null);
    const [showVideoBackground, setShowVideoBackground] = useState(true);

    useImperativeHandle(ref, () => innerRef.current!, []);

    useEffect(() => {
      const currentVideo = innerRef.current;
      if (currentVideo) {
        currentVideo.volume = 0.2;
        currentVideo.onplay = () => setShowVideoBackground(false);
        currentVideo.onended = () => setShowVideoBackground(true);
        // Reset showVideoBackground to true when component unmounts or updates
        return () => {
          setShowVideoBackground(true);
        };
      }
    }, []);

    // Update showVideoBackground state when showTitle changes
    useEffect(() => {
      setShowVideoBackground(true);
    }, [showTitle]);

    return (
      <div className={`${Style.card} ${className}`} onClick={onClick}>
        <div
          className={Style.videoBackground}
          style={{
            backgroundImage: `linear-gradient(to bottom right, var(--video-background-${videoNumber}-start), var(--video-background-${videoNumber}-end))`,
            display: showVideoBackground && !showTitle ? 'flex' : 'none'
          }}
        >
          <p>{videoNumber}</p>
        </div>
        <div className={Style.animeTitle} style={{ display: showTitle ? 'flex' : 'none' }}>
          <span>{title.toUpperCase()}</span>
          <span>OPENING {openingNumber.toString().toUpperCase()}</span>
        </div>
        <video
          className={Style.video}
          src={src}
          ref={innerRef}
          playsInline
          loop={false}
        />
      </div>
    );
  }
);

export default AnimeCard;
