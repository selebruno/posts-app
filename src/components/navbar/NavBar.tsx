import { Avatar, Popover, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import styles from './navbar.module.css';

const NavBar = () => {
  const userEmail = localStorage.getItem('email');
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <nav className={styles.nav}>
      <div className={styles.titleContainer}>
        <a className={styles.home} href="/home">
          <HomeIcon fontSize="large" />
        </a>
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
        <Avatar
          sx={{
            width: 50,
            height: 50,
            backgroundColor: '#545273',
            border: 'none',
            cursor: 'pointer'
          }}
          component="button"
          onClick={handleClick}>
          {localStorage.getItem('email')?.slice(0, 1).toUpperCase()}
        </Avatar>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 70, left: 1860 }}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}>
          <div className={styles.linkContainer}>
            <button
              tabIndex={0}
              onKeyDown={() => {
                navigate('/home');
              }}
              type="button"
              className={styles.link}
              onClick={() => {
                navigate('/home');
              }}>
              <b>Home</b>
            </button>
            <button
              tabIndex={0}
              onKeyDown={() => {
                navigate('/favorites');
              }}
              type="button"
              className={styles.link}
              onClick={() => {
                navigate('/favorites');
              }}>
              <b>Favorites</b>
            </button>
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
              Log Out
            </button>
            {userEmail && (
              <Tooltip title={userEmail}>
                <p className={styles.email}>{userEmail}</p>
              </Tooltip>
            )}
          </div>
        </Popover>
      </div>
    </nav>
  );
};

export default NavBar;
