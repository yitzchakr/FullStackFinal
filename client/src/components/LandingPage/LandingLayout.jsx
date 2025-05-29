import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styles from '../../styles/LandingLayout.module.css'

const LandingLayout = () => {
  return (
    <div className={styles.landingContainer}>
      <header className={styles.landingHeader}>
        <h1 className={styles.landingHead}>Welcome to Guiding Light</h1>
        <p className={styles.landingSubhead}>A place to turn in times of crisis</p>
      </header>
      <nav className={styles.landingNav}>
        <ul className={styles.landingNavList}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.landingNavItem} ${styles.activeNavItem}` : styles.landingNavItem
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? `${styles.landingNavItem} ${styles.activeNavItem}` : styles.landingNavItem
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${styles.landingNavItem} ${styles.activeNavItem}` : styles.landingNavItem
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? `${styles.landingNavItem} ${styles.activeNavItem}` : styles.landingNavItem
              }
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

export default LandingLayout