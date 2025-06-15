import React, { useState } from 'react';
import AssignedCasesList from './AssignedCasesList';
import styles from '../../../styles/ManagerLayout.module.css';
export default function Worker({ worker }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleViewCases = () => {
    setShowPopup(true);
  };

  return (
    < >
      <h2>{worker.firstName} {worker.lastName}</h2>
      <p>Region: {worker.region}</p>
      <p>
        Specialties: {Array.isArray(worker.specialties) ? worker.specialties.join(', ') : worker.specialties}
      </p>
      <p><strong>Case Load: {worker?.cases?.length}</strong></p>
      <button onClick={handleViewCases}
      className={styles.viewCasesButton}
      >Assigned cases</button>
      <AssignedCasesList
        worker={worker}
        open={showPopup}
        onClose={() => setShowPopup(false)}
        cases={worker.cases || []}
      />
    </>
  );
}
