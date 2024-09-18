import Avatar from "@mui/material/Avatar";
import Style from "./About.module.css";
import aboutLogo from "../../assets/images/logo.png";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export default function AboutContent() {
    return (
        <div className={Style.mainLayout}>
        <section className={Style.aboutContainer}>
            <header className={Style.aboutHeader}>
                <Avatar alt="logo" src={aboutLogo} sx={{ width: 70, height: 70 }} />
                <h1>About</h1>
                </header>
            <hr className={Style.divider} />
            <section className={Style.aboutMain}>
                <p>
                    Hello there! I'm Artur, the creator of this website. Thank you for
                    visiting — I truly appreciate your support!
                </p>
                <h2>Who am I?</h2>
                <hr className={Style.divider} />
                <p>
                    I'm a front-end developer from Poland. In my free time, I enjoy
                    watching anime, playing games (mostly Path of Exile and gacha
                    games), playing bass guitar, and learning Japanese.
                </p>
                <p>
                    I'm currently learning React, Next.js 14, and Zustand. I hope you
                    enjoy using my website!
                </p>
                <h2>The Website</h2>
                <hr className={Style.divider} />
                <p>
                    This website is a fan project, unaffiliated with any anime
                    production companies. I created it for fun and to share my passion.
                    I’ve always enjoyed watching others share their favorite anime
                    opening picks from each year, so I decided to create this site.
                </p>
            </section>
            <hr className={Style.divider} />
            <section className={Style.supportSection}>
                <h2>
                    If you'd like to support me, you can leave a donation through{" "}
                    <a href="https://www.paypal.com/donate/?hosted_button_id=3EPYZKTUG29SW">
                    PayPal
                    </a>
                    . I would appreciate it <InsertEmoticonIcon  />. Thank you!
                </h2>
            </section>
        </section>
        </div>
    );
}