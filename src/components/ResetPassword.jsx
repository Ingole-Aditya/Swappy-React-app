import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import authService from '../appwrite/auth';
function ResetPassword() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null);
    const navigate=useNavigate()
    const submit = (data) => {
        if (data.newpass == data.confirmpass) {
            setError(null)
            authService.resetPassword(data.confirmpass)
            navigate('/login', { state: { message: "Password reset successfully" } })
        }
        else {
            setError("New password and confirm password do not match.");
        }
        
    }
  return (
    <div className="grid-back h-screen w-screen flex justify-center items-center ">
      <div className=" absolute top-10">
        {error && (
          <Alert severity="error" onClose={() => setError("")}>
            {error}
          </Alert>
        )}
        {msg && (
          <Alert severity="success" onClose={() => setMsg("")}>
            {msg}
          </Alert>
        )}
        <ToastContainer/>
      </div>
      <div className="h-fit max-sm:w-full  bg-white  p-5 box-content shadow-md rounded-md outline outline-1  outline-gray-100 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-xl font-semibold text-center text-gray-900">
          Reset Password
        </h1>
        <div>
          <form onSubmit={handleSubmit(submit)}>
            <label
              htmlFor="newpass"
              className="block text-sm/6 font-medium text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                id="newpass"
                name="newpass"
                type="text"
                required
                autoComplete="newpass"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("newpass", { required: true })}
              />
            </div>
            <label
              htmlFor="confirmpass"
              className="block text-sm/6 font-medium text-gray-900 mt-3"
            >
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirmpass"
                name="confirmpass"
                type="password"
                required
                autoComplete="confirmpass"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("confirmpass", { required: true })}
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword