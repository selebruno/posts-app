import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = () => {
  const userEmail = localStorage.getItem('email');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <div className={styles.titleContainer}>
        <a
          href="https://github.com/selebruno/posts-app"
          target="_blank"
          rel="noreferrer"
          className={styles.title}>
          Postagram
        </a>
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
            <p>{userEmail}</p>
            <button
              tabIndex={0}
              onKeyDown={() => {
                localStorage.clear();
                navigate('/');
              }}
              type="button"
              className={styles.link}
              onClick={() => {
                localStorage.clear();
                navigate('/');
              }}>
              <b>Log Out</b>
            </button>{' '}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
