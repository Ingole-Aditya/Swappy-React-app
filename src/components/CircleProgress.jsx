import { CircularProgress } from '@mui/material'
import React from 'react'

function CircleProgress() {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-10 flex justify-center items-center" >
      <CircularProgress />
    </div>
  );
}

export default CircleProgress