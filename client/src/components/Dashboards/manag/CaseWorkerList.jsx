import React from 'react'
import { useManagerContext } from '../../../hooks/useManagerCon';
import Worker from './Worker'; // Assuming Worker is a component that displays worker details
import styles from '../../../styles/ManagerLayout.module.css';

export default function CaseWorkerList() {
  const caseworkers = useManagerContext().caseworkers;
  return (
    <div>
      <h2>Case Workers</h2>
      <p>List of case workers assigned to requests.</p>
      <div className={styles.caseWorkerGrid}>
        {caseworkers.map((worker) => (
          <div key={worker.id} className={styles.caseWorkerCard}>
            <Worker worker={worker}/>
          </div>
        ))}
      </div>
    </div>
  )
}
