import React from 'react'

const Requests = ({ requests }) => {
  return (
    <div>
      {requests.map(req => (
        <div key={req.id}>
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
          <hr />
        </div>
      ))}
    </div>
  )
}

export default Requests