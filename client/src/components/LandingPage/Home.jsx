import React from 'react'
import { Link } from 'react-router-dom' // Import Link from react-router-dom

const Home = () => {
  return (
    <div>
      <h1>You Are Not Alone. We're Here to Help.</h1>
      <p>
        At Guiding Light, we understand that life can sometimes feel overwhelming. Whether you're facing emotional distress, 
        mental health challenges, or an urgent personal crisis, we're here to support you with compassion, respect, and confidentiality.
      </p>

      <p>
        Our trained crisis intervention team is available to guide you through difficult times, provide immediate assistance, 
        and connect you with resources tailored to your unique needs. No concern is too small. If it matters to you, it matters to us.
      </p>

      <h2>What We Offer:</h2>
      <ul >
        <li>24/7 Crisis Support</li>
        <li>One-on-One Counseling</li>
        <li>Emergency Intervention Services</li>
        <li>Referrals to Mental Health Professionals</li>
        <li>Support for Families and Caregivers</li>
      </ul>

      <p>
        Your safety and well-being are our highest priority. Reach out—there is help, there is hope.
      </p>

      <h3>Need Help Now?</h3>
      <p>
        Please fill out our confidential Help Request Form and a member of our team will contact you as soon as possible.
      </p>

      <p>
        👉 <Link to="/requests">Submit a Request for Help</Link>
      </p>
    </div>
  )
}

export default Home