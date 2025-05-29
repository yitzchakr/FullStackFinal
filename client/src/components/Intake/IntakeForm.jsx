import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Popup from './Popup';
import styles from '../../styles/IntakeForm.module.css';

const IntakeForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitState, setSubmitState] = useState(null); // Tracks submission state
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks if the form is being submitted
  const [errorMessage, setErrorMessage] = useState(''); // Tracks error message from the server

  async function submitForm(data) {
    setIsSubmitting(true); // Disable form inputs and buttons
    try {
      const response = await axios.post('http://localhost:3000/requests', data);
      console.log(response); // Debugging: Log the response object
      setSubmitState('success'); // Show success popup
      reset(); // Reset the form
    } catch (error) {
      console.error('Error submitting form:', error); // Debugging: Log the error object
      setSubmitState('failed'); // Show failure popup
      setErrorMessage(error.response?.data || 'An unknown error occurred.'); // Set error message
    } finally {
      setIsSubmitting(false); // Re-enable form inputs and buttons
    }
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Crisis Intake Form</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <label htmlFor="firstName" className={styles.label}>First Name</label>
        <input
          id="firstName"
          className={styles.input}
          {...register('firstName', { required: 'Name is required' })}
          disabled={isSubmitting}
        />
        {errors.firstName && <p className={styles.errorMes}>{errors.firstName.message}</p>}

        <label htmlFor="lastName" className={styles.label}>Last Name</label>
        <input
          id="lastName"
          className={styles.input}
          {...register('lastName', { required: 'Name is required' })}
          disabled={isSubmitting}
        />
        {errors.lastName && <p className={styles.errorMes}>{errors.lastName.message}</p>}

        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          type="email"
          className={styles.input}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email',
            },
          })}
          disabled={isSubmitting}
        />
        {errors.email && <p className={styles.errorMes}>{errors.email.message}</p>}

        <label htmlFor="phone" className={styles.label}>Phone</label>
        <input
          id="phone"
          type="tel"
          className={styles.input}
          {...register('phone', {
            pattern: {
              value: /^(0(2|3|4|5\d|7[2-9]|8|9))\d{7}$/,
              message: 'Please enter a valid Israeli phone number',
            },
          })}
          disabled={isSubmitting}
        />
        {errors.phone && <p className={styles.errorMes}>{errors.phone.message}</p>}

        <label htmlFor="description" className={styles.label}>Describe Crisis</label>
        <textarea
          id="description"
          className={styles.textarea}
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          })}
          disabled={isSubmitting}
        />
        {errors.description && <p className={styles.errorMes}>{errors.description.message}</p>}

        <label htmlFor="location" className={styles.label}>Location</label>
        <select
          id="location"
          className={styles.select}
          {...register('location', { required: 'Location is required' })}
          disabled={isSubmitting}
        >
          <option value="">Select a region</option>
          <option value="north">North</option>
          <option value="center">Center</option>
          <option value="south">South</option>
          <option value="jerusalem">Jerusalem</option>
        </select>
        {errors.location && <p className={styles.errorMes}>{errors.location.message}</p>}

        <label htmlFor="familySize" className={styles.label}>Family Size</label>
        <input
          id="familySize"
          type="number"
          className={styles.input}
          min="1"
          max="20"
          {...register('familySize', {
            required: 'Family size is required',
            min: { value: 1, message: 'Family size must be at least 1' },
            max: { value: 20, message: 'Family size cannot exceed 20' },
          })}
          disabled={isSubmitting}
        />
        {errors.familySize && <p className={styles.errorMes}>{errors.familySize.message}</p>}

        <label htmlFor="preferredContact" className={styles.label}>Preferred Contact Method</label>
        <select
          id="preferredContact"
          className={styles.select}
          {...register('preferredContact', { required: 'Preferred contact method is required' })}
          disabled={isSubmitting}
        >
          <option value="">Select a contact method</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="text">Text</option>
        </select>
        {errors.preferredContact && <p className={styles.errorMes}>{errors.preferredContact.message}</p>}

        <button type="submit" className={styles.button} disabled={isSubmitting}>
          Submit
        </button>
      </form>

      {submitState && (
        <Popup submitState={submitState} setSubmitState={setSubmitState} errorMessage={errorMessage} />
      )}
    </div>
  );
};

export default IntakeForm;