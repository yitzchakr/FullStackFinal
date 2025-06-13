import React, { useState } from 'react';
import AssignedCasesList from './AssignedCasesList';

export default function Worker({ worker }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleViewCases = () => {
    setShowPopup(true);
  };

  return (
    <div>
      <h2>{worker.firstName} {worker.lastName}</h2>
      <p>Region: {worker.region}</p>
      <p>
        Specialties: {Array.isArray(worker.specialties) ? worker.specialties.join(', ') : worker.specialties}
      </p>
      <p><strong>Case Load: {worker?.cases?.length}</strong></p>
      <button onClick={handleViewCases}>View assigned cases</button>
      <AssignedCasesList
        worker={worker}
        open={showPopup}
        onClose={() => setShowPopup(false)}
        cases={worker.cases || []}
      />
    </div>
  );
}
