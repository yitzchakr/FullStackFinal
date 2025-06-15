import React, { useState } from 'react'
import api from '../../../api/axios'
import styles from '../../../styles/Request.module.css'
import { useAuth } from '../../../hooks/useAuth'
import { useManagerContext } from '../../../hooks/useManagerCon'

const Request = ({ req, caseworkers}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCaseworker, setSelectedCaseworker] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [assignError, setAssignError] = useState('')
  const [assignSuccess, setAssignSuccess] = useState('')
  const { currentUser } = useAuth();
    const { fetchManagerData } = useManagerContext()

  const toggleDetails = () => {
    setIsOpen(!isOpen)
    setAssignError('')
    setAssignSuccess('')
  }

  const handleAssign = async (e) => {
    e.stopPropagation()
    setAssignError('')
    setAssignSuccess('')
    if (!selectedCaseworker) {
      setAssignError('Please select a caseworker.')
      return
    }
    setAssigning(true)
    try {
      await api.post('/manager/assign', {
        requestId: req.id,
        caseworkerId: selectedCaseworker,
        assignedBy: currentUser.id, // Assuming user.id is the ID of the manager assigning
        priorityLevel: req.urgency_level // Assuming you want to assign the urgency level as priority
      })
      setAssignSuccess('Assigned successfully!')
      await fetchManagerData(); // Refresh the data after assignment
    } catch (err) {
      setAssignError(err.response?.data?.message || 'Assignment failed')
    } finally {
      setAssigning(false)
    }
  }

  return !isOpen ? (
    <div className={styles.requestSummary} onClick={toggleDetails}>
      <span>
        <strong>{req.client_first_name} {req.client_last_name}</strong>
      </span>
     
      <span className={styles.region}>Region: {req.geographical_location}</span>
    </div>
  ) : (
    <div className={styles.requestDetails} onClick={toggleDetails}>
      <h3>Request #{req.id}</h3>
      <p><strong>Client:</strong> {req.client_first_name} {req.client_last_name}</p>
      <p><strong>Email:</strong> {req.client_email}</p>
      <p><strong>Phone:</strong> {req.client_phone}</p>
      <p><strong>Description:</strong> {req.request_description}</p>
      <p><strong>Urgency:</strong> {req.urgency_level}</p>
      <p><strong>Family Size:</strong> {req.family_size}</p>
      <p><strong>Location:</strong> {req.geographical_location}</p>
      <p><strong>Preferred Contact:</strong> {req.preferred_contact_method}</p>
      <p><strong>Submitted At:</strong> {new Date(req.submitted_at).toLocaleString()}</p>
      <p><strong>Status:</strong> {req.status}</p>
      <div className={styles.assignSection} onClick={e => e.stopPropagation()}>
        <select
          className={styles.select}
          value={selectedCaseworker}
          onChange={e => setSelectedCaseworker(e.target.value)}
        >
          <option value="">Select Caseworker</option>
          {caseworkers.map(cw => (
            <option key={cw.id} value={cw.id}>
              {cw.firstName} {cw.lastName}
            </option>
          ))}
        </select>
        <button
          className={styles.assignButton}
          onClick={handleAssign}
          disabled={assigning}
        >
          {assigning ? 'Assigning...' : 'Assign'}
        </button>
        {assignError && <span className={styles.error}>{assignError}</span>}
        {assignSuccess && <span className={styles.success}>{assignSuccess}</span>}
      </div>
      <hr />
    </div>
  )
}

export default Request