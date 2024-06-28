import Style from "./AnimeCard.module.css"

export default function AnimeCard() {
    return (
      <>
        <div className={Style.card}>
            <video id="my-video" src="@D:/testFilm/test1.mp4">
            </video>
        </div>
      </>
    )
}