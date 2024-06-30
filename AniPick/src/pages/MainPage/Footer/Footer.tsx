import Style from "./Footer.module.css";
import PayPalLogo from "../../../assets/images/PayPalLogo.png";
import PatreonLogo from "../../../assets/images/PatreonLogo.png";

export default function Footer() {
  return (
    <>
      <footer className={Style.footer}>
        <div className={Style.rightsContainer}>
          <div>
            <p>Copyright © {new Date().getFullYear()} AniPick. All rights reserved.</p>
            <p>All anime content is used under fair use for commentary and educational purposes.</p>
          </div>
          <div className={Style.contactInfo}>
            <span>Contact</span>
            <span>About</span>
          </div>
        </div>
        <div className={Style.termsContainer}>
          <h2>AniPick</h2>
          <div className={Style.support}>
            <span>Support:</span>
            <img alt="PayPal Logo" src={PayPalLogo}/>
            <img alt="Patreon Logo" src={PatreonLogo}/>
          </div>
          <p>
            AniPick is a fan-based project and is not affiliated with any anime production companies. 
            All trademarks and copyrights belong to their respective owners.
          </p>
          <p>
            Please ensure that you have the right to use any content you upload, and respect copyright laws.
          </p>
        </div>
      </footer>
    </>
  );
}