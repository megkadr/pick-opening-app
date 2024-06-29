import Style from "./MainLayout.module.css"
import AnimeCard from "./AnimeCard/AnimeCard"
import video1 from "../../../assets/videos/kaiju.mp4"
import video2 from "../../../assets/videos/mashle.mp4"
import video3 from "../../../assets/videos/solo_leveling.mp4"
const VIDEOS = [video1, video2, video3]
const VIDEOS2 = [video1, video2, video3]

export default function MainLayout() {
    return (
      <>
        <div className={Style.mainLayout}>
            <div className={Style.mainContent}>   
                <div className={Style.year}><p className={Style.yearNumber}>2020</p></div>  
                <div className={Style.quizTitle}><h1>ONLY SAVE 1 OPENING!</h1></div> 
            </div> 
            <div className={Style.cardPicks}>
                <AnimeCard src={VIDEOS[0]} />
                <AnimeCard src={VIDEOS[1]} />
                <AnimeCard src={VIDEOS[2]} />
                <AnimeCard src={VIDEOS[0]} />
                <AnimeCard src={VIDEOS[1]} />
                <AnimeCard src={VIDEOS[2]} />
            </div>
        </div>
      </>
    )
}