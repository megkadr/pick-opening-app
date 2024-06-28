import Style from "./MainLayout.module.css"
import AnimeCard from "./AnimeCard/AnimeCard"

export default function MainLayout() {
    return (
      <>
        <div className={Style.mainLayout}>
            <div className={Style.mainContent}>   
                <div className={Style.year}> 2020</div>  
                <div className={Style.quizTitle}><h1>Title</h1></div> 
            </div> 
            <div className={Style.cardPicks}>
                <AnimeCard />
                <AnimeCard />
                <AnimeCard />
                <AnimeCard />
                <AnimeCard />
                <AnimeCard />
            </div>
        </div>
      </>
    )
}