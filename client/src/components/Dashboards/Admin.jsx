import React from 'react'
import { useNavigate} from 'react-router-dom'

export const Admin = () => {
    const navigate =useNavigate()
  return (
   <> 
   <button onClick={()=>navigate('/')}></button>
    <div>Admin</div>
  </>
  )
}
