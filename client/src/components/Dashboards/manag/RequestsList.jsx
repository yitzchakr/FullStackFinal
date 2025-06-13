import React from 'react'
import Request from './Request'
import styles from '../../../styles/Request.module.css'
import { useManagerContext } from '../../../hooks/useManagerCon'
const RequestsList = () => {
  const { unassignedRequests, caseworkers} = useManagerContext()
  return (
    <div className={styles.requestSectionContainer}>
      <div className={styles.requestSection}>
        <h2>Unassigned Requests</h2>
        <p>Click on a request to view details and assign a caseworker.</p>
        {unassignedRequests.map(req => (
          <div key={req.id}>
            <Request req={req} caseworkers={caseworkers}  />
          </div>
        ))}
      </div>
    </div>
  )
}

export default RequestsList