import React from 'react'
import styles from'../../styles/landing.module.css'
import { Outlet } from 'react-router-dom'

const LandingLayout = () => {
  return (
    <div className={styles.landingContainer}>
      <header className={styles.landingHeader}>
        <h1 className={styles.landingHead}>Welcome to Guiding Light</h1>
        <p className={styles.landingSubhead}>A place to turn in times of crisis</p>
      </header>
      <nav className={styles.landingNav}>
        <ul className={styles.landingNavList}>
          <li className={styles.landingNavItem}>Home</li>
          <li className={styles.landingNavItem}>About</li>
          <li className={styles.landingNavItem}>Contact</li>
          <li className={styles.landingNavItem}>Login</li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  )
}

export default LandingLayout