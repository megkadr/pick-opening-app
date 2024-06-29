import Style from "./AnimeCard.module.css"

interface AnimeCardProps {
  src: string
}

export default function AnimeCard({src}: AnimeCardProps) {
    return (
      <>
        <div className={Style.card}>
            <video className={Style.video} src={src}>
            </video>
        </div>
      </>
    )
}