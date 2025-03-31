import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import authService from '../appwrite/auth'
import { login as storeLogin } from "../store/authSlice"
import { Link } from 'react-router'
import logo from '../assets/logos/logo tranparent.png'
import CircleProgress from './CircleProgress'
import { Alert } from '@mui/material'
import "../App.css";
function LoginForm() {
    const [loading,setLoading]=useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")
  const navigate = useNavigate();
    const login = async (data)=>{
        setError("")
      try {
          setLoading(true)
            const session = await authService.login(data)
            
            if (session) {
                const userData = authService.getCurrentUser();
                if (userData)
                    dispatch(storeLogin(userData))
              navigate("/")
              setLoading(false)
            }
      } catch (error) {
        setLoading(false)
            setError(error.message)
        }
    }
  return (
    <>
      <div className="flex h-screen flex-1 flex-col grid-back justify-center px-6  align-middle lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-14 w-auto" />
          {error && (
            <Alert
              severity="error"
              onClose={() => {
                setError("");
              }}
            >
              {error}
            </Alert>
          )}
          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 bg-white  p-5 box-content shadow-md rounded-md outline outline-1  outline-gray-100 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(login)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(
                          value
                        ) || "Email address must be valid",
                    },
                  })}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  {...register("password", {
                    required: true,
                    // validate: {
                    //   matchPatern: (value) =>
                    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value) || "password should be valid",
                    // },
                  })}
                />
              </div>
            </div>
            <div className="text-sm flex justify-end">
              <Link
                to="/forgotpass"
                className="font-semibold  text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
            {loading ? <CircleProgress /> : null}
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginForm