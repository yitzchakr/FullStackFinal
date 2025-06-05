import React from 'react'
import styles from '../../styles/DashboardHeader.module.css'
import { useAuth } from '../../hooks/useAuth'
const Header = () => {
    const { currentUser,logout } = useAuth()
  return (
    <div>
        <header className= {styles.dashboardHeader}>
            <h1>{currentUser?.role} Dashboard</h1>
            <button onClick={logout} className={styles.logoutButton}>Logout</button>
        </header>
        <div className={styles.dashboardHeaderDivider}></div>

       <h2>Hello {currentUser?.first_name}</h2> 
    </div>
  )
}

export default Header