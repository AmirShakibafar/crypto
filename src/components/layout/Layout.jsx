import React from "react";
import styles from "./Layout.module.css";
import bitcoinMascot from "../../assets/bitcoin.png";
import { FiGithub } from "react-icons/fi";

function Layout({ children }) {
  const handleScrollToMarket = (e) => {
    e.preventDefault();
    const marketSection = document.getElementById('market');
    if (marketSection) {
      marketSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.containerHero}>
          <img
            src={bitcoinMascot}
            alt="Bitcoin Mascot"
            className={styles.heroImage}
          />
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>Crypto Tracker</h1>
              <p className={styles.heroSubtitle}>
                Your portal to the world of digital assets
              </p>
              <div className={styles.buttonGroup}>
                <a 
                  href="#market" 
                  className={styles.ctaButton}
                  onClick={handleScrollToMarket}
                >
                  View Market
                </a>
                <a 
                  href="https://github.com/AmirShakibafar" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubButton}
                >
                  <FiGithub className={styles.githubIcon} />
                  Creator's GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>{children}</div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>
            Powered by{" "}
            <a
              href="https://www.coingecko.com/en/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              CoinGecko API
            </a>
          </p>
          <p>
            &copy; {new Date().getFullYear()} Crypto Tracker. All rights
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default Layout;