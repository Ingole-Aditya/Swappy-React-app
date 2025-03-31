import { Alert } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';

function ForgotPassword() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null);
    const submit = (data) => {
        console.log(data.email)
        try {
            authService.forgotPassword(data.email)
            setMsg("A reset link has been sent to your email.");
        } catch (e) {
            setError(e)
            setMsg(null)
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
      </div>
      <div className="h-fit max-sm:w-full  bg-white  p-5 box-content shadow-md rounded-md outline outline-1  outline-gray-100 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="text-xl font-semibold text-center text-gray-900">
          Recovery Email
        </h1>
        <div>
          <form onSubmit={handleSubmit(submit)}>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Rocovery Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email"
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword