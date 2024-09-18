import Style from "./Footer.module.css";
import PayPalLogo from "../../../assets/images/PayPalLogo.png";
import { Link } from "react-router-dom";

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
            <Link to={"/about"} style={{ textDecoration: "none", color: "#6c6c6c" }}>About</Link>
          </div>
        </div>
        <div className={Style.termsContainer}>
          <h2>AniPick</h2>
          <div className={Style.support}>
            <span>Support:</span>
            <a href="https://www.paypal.com/donate/?hosted_button_id=3EPYZKTUG29SW"><img alt="PayPal Logo" src={PayPalLogo}/></a>
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