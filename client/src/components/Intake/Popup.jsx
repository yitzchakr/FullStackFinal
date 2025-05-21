import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/intakePopup.module.css'

const Popup = ({ submitState, setSubmitState, errorMessage }) => {
  const navigate = useNavigate()

  function handleSubmissionResponse() {
    if (submitState === 'success') {
      navigate('/') // Navigate to the home page on success
    } else {
      setSubmitState(null) // Reset the popup state to return to the form
    }
  }

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        {submitState === 'success' && <p>Request submitted successfully!</p>}
        {submitState === 'failed' && (
          <p>
            Failed to submit the request. {errorMessage ? ` ${errorMessage}` : 'Please try again.'}
          </p>
        )}
        <button onClick={handleSubmissionResponse} className={styles.confirmButton}>
          Confirm
        </button>
      </div>
    </div>
  )
}

export default Popup