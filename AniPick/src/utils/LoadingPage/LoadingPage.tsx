import LoadingPageStyle from "./LoadingPage.module.css";

export default function LoadingPage() {
    return (
        <div className={LoadingPageStyle.loaderBox} style={{display: status}}>
            <div className={LoadingPageStyle.loader}></div>
        </div>
    )
}