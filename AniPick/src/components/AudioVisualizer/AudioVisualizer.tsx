import Style from "./AudioVisualizer.module.css"
import audioVisualizer from "../../assets/images/audio_visualizer.gif"
const AudioVisualizer = () => {
    return (
        <div className={Style.visualizer}>
            <img src={audioVisualizer} alt="Audio Visualizer" />
        </div>
    )
}

export default AudioVisualizer