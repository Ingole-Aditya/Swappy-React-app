import { useEffect, useState } from 'react'
import './App.css'
import Navbar from "./components/Navbar"
import { useDispatch } from 'react-redux'
import authService from "./appwrite/auth"
import { login, logout } from './store/authSlice'
import Footer from './components/Footer'
import { Outlet } from 'react-router'
import CircleProgress from './components/CircleProgress'

function App() {
  const [loading, setLoading] = useState(true)  //for better calling database
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((erro) => {
        setError(erro.message);
        console.log(erro.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  
  if (loading) {
    return (<CircleProgress/>)
  }

  return (

    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  )
}

export default App
