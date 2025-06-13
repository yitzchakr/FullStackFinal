import React, { useState } from 'react';
import { useManagerContext } from '../../../hooks/useManagerCon';
import styles from '../../../styles/AssignedCasesList.module.css';
import api from '../../../api/axios';

export default function AssignedCasesList({ open, onClose, cases,worker }) {
  const { caseworkers, fetchManagerData } = useManagerContext();
  const [reassigningId, setReassigningId] = useState(null);
const [selectedWorker, setSelectedWorker] = useState({});
  const [message, setMessage] = useState('');

  if (!open) return null;

  const handleReassign = async (caseId) => {
  
    setReassigningId(caseId);
    setMessage('');
    try {
      await api.put('/manager/reassign', {
       caseId,
        caseworkerId:selectedWorker[caseId],
      });
      setMessage('Case reassigned!');
      await fetchManagerData?.();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to reassign.');
    } finally {
      setReassigningId(null);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>Assigned Cases for {worker.firstName} {worker.lastName}</h2>
        {cases.length === 0 ? (
          <p>No assigned cases for {worker.firstName} {worker.lastName}</p>
        ) : (
          <table className={styles.casesTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Request ID</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Reassign</th>
              </tr>
            </thead>
            <tbody>
              {cases.map(c => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.requestId}</td>
                  <td>{c.status}</td>
                  <td>{c.priority}</td>
                  <td>
                    <select
                      className={styles.select}
                      value={selectedWorker[c.id] || ''}
                      onChange={e =>
                        setSelectedWorker(sw => ({ ...sw, [c.id]: e.target.value }))
                      }
                      disabled={reassigningId === c.id}
                    >
                      <option value="">Select</option>
                      {caseworkers.map(w => (
                        <option key={w.id} value={w.id}>
                          {w.firstName} {w.lastName}
                        </option>
                      ))}
                    </select>
                    <button
                      className={styles.reassignButton}
                      onClick={() => handleReassign(c.id)}
                      disabled={reassigningId === c.id}
                    >
                      {reassigningId === c.id ? 'Reassigning...' : 'Reassign'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {message && <div className={styles.message}>{message}</div>}
      </div>
    </div>
  );
}
