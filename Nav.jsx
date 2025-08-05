import React from 'react';
import styles from '../styles/Nav.module.css';

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>Rentergy</a>
        <ul className={styles.navLinks}>
          <li><a href="#features">Features</a></li>
          <li><a href="#quiz">Get Tips</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;