"use client";
import { useState } from "react";
import styles from "./AgeGate.module.css";

export default function AgeGate({ onEnter }) {
  const [selected, setSelected] = useState("girls");

  const cats = [
    {
      id: "girls", label: "GIRLS", color: "#e91e8c",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="19" r="12" stroke="#e91e8c" strokeWidth="3" fill="none"/>
          <line x1="25" y1="31" x2="25" y2="44" stroke="#e91e8c" strokeWidth="3" strokeLinecap="round"/>
          <line x1="18" y1="38" x2="32" y2="38" stroke="#e91e8c" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "guys", label: "GUYS", color: "#29b6f6",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="21" cy="29" r="12" stroke="#29b6f6" strokeWidth="3" fill="none"/>
          <line x1="30" y1="20" x2="43" y2="7" stroke="#29b6f6" strokeWidth="3" strokeLinecap="round"/>
          <line x1="35" y1="7" x2="43" y2="7" stroke="#29b6f6" strokeWidth="3" strokeLinecap="round"/>
          <line x1="43" y1="7" x2="43" y2="15" stroke="#29b6f6" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: "trans", label: "TRANS", color: "#ab47bc",
      icon: (
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <circle cx="25" cy="25" r="10" stroke="#ab47bc" strokeWidth="3" fill="none"/>
          <line x1="18" y1="18" x2="9"  y2="9"  stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
          <line x1="9"  y1="9"  x2="15" y2="9"  stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
          <line x1="9"  y1="9"  x2="9"  y2="15" stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
          <line x1="32" y1="18" x2="41" y2="9"  stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
          <line x1="35" y1="9"  x2="41" y2="9"  stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
          <line x1="41" y1="9"  x2="41" y2="15" stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
          <line x1="25" y1="35" x2="25" y2="44" stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
          <line x1="19" y1="40" x2="31" y2="40" stroke="#ab47bc" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.root}>
      <main className={styles.main}>
        {/* Logo */}
        <div className={styles.logo}>
          <img src="/stripchatbate-rd.png" alt="Stripchatbate" style={{ height: 48, objectFit: "contain" }} />
        </div>

        <p className={styles.tagline}>
          We are creating a better experience for <strong>18+ LIVE</strong> entertainment.
          Join our open-minded community &amp; start interacting now for <strong>FREE</strong>.
        </p>

        <p className={styles.interestLabel}>I'm interested in:</p>

        <div className={styles.catGrid}>
          {cats.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={styles.catBtn}
              style={selected === cat.id ? {
                borderColor: cat.color,
                background: `${cat.color}1a`,
                boxShadow: `0 0 20px ${cat.color}44`,
              } : {}}
            >
              {cat.icon}
              <span style={{ color: selected === cat.id ? cat.color : "#888" }} className={styles.catLabel}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        <button className={styles.enterBtn} onClick={() => onEnter(selected)}>
          I'm Over 18
        </button>

        <p className={styles.legal}>
          By entering and using this website, you confirm you're over 18 years old and agree to be
          bound by the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>{" "}
          <a href="#">18 U.S.C. 2257 Record-Keeping Requirements Compliance Statement.</a>
          <br /><br />
          If you provide sensitive personal data, by entering the website, you give your explicit
          consent to process this data. If you're looking for a way to restrict access for a minor,
          see our <a href="#">Parental Control Guide</a>.
        </p>

        <div className={styles.divider} />
        <a href="https://www.google.com" className={styles.exitLink}>Exit Here</a>
      </main>

      <footer className={styles.footer}>
        <p>
          <strong>THIS WEBSITE CONTAINS MATERIAL THAT IS SEXUALLY EXPLICIT.</strong>{" "}
          You must be at least eighteen (18) years of age to use this Website. Use of this
          Website is not permitted where prohibited by law.
        </p>
        <p>
          This Website requires the use of cookies. BY ENTERING THIS WEBSITE YOU AGREE TO
          THE USE OF COOKIES AND ACKNOWLEDGE THE PRIVACY POLICY.<br />
          All models were 18 and over at the time of the creation of such depictions.
        </p>
        <div className={styles.badges}>
          <div className={styles.badgeRta}>
            <div className={styles.rtaBox}>RTA</div>
            <div className={styles.rtaSub}>Restricted to Adults</div>
          </div>
          <div className={styles.badgeSafe}>
            <span>✓</span>
            <span>SafeLabeling.org</span>
            <span>COMPLIANT WEBSITE</span>
          </div>
          <div className={styles.badgeAsacp}>
            ASACP<span>APPROVED MEMBER</span>
          </div>
        </div>
      </footer>
    </div>
  );
}