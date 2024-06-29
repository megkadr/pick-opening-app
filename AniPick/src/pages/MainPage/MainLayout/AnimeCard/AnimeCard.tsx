import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';
import Style from "./AnimeCard.module.css";

interface AnimeCardProps {
  src: string;
  title: string;
  onClick: () => void;
  className?: string;
}

const AnimeCard = forwardRef<HTMLVideoElement, AnimeCardProps>(
  ({ src, title, onClick, className }, ref) => {
    const innerRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => innerRef.current!, []);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.volume = 0.2;
      }
    }, []);

    return (
      <div className={`${Style.card} ${className}`} onClick={onClick}>
        <video
          className={Style.video}
          src={src}
          ref={innerRef}
          playsInline
          loop={false}
        >
        </video>
        <div className={Style.title}>{title}</div>
      </div>
    );
  }
);

export default AnimeCard;