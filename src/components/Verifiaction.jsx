import React, { useEffect } from 'react'
import ErrorPage from './ErrorPage'
import authService from '../appwrite/auth'
function Verifiaction() {
    useEffect(() => {
        authService.verify()
    },[])
  return (
    <div>
          <ErrorPage 
              message="Verification successful!"
              description="Your account has been verified successfully. You can now log in to your account."
              btn='Log in'
              navigate="/login"/>
    </div>
  )
}

export default Verifiaction