import { useState } from 'react';
import styles from './navbar.module.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <nav className={styles.nav}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Postagram</h1>
        <img className={styles.logo} src="/images/logo.png" alt="logo" />
      </div>
      <div className={styles.userMenu}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onKeyDown={() => setIsMenuOpen(!isMenuOpen)}>
          <img className={styles.userMenuAvatar} src="/users/user10.jpeg" alt="menu" />
        </div>

        {isMenuOpen && (
          <div className={styles.linkContainer}>
            <a className={styles.link} href="/">
              <b>Log Out</b>
            </a>{' '}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
