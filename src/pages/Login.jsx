import React, { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import "../App.css";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from 'react-router';
function Login() {
  const location = useLocation()
  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message)
    }
  },[])
  return (
    <div className='grid-back'>
      <ToastContainer/>
      <LoginForm />
    </div>
  )
}

export default Login