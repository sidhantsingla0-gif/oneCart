import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()
  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] md:text-[70px] text-[40px] text-[white] flex items-center justify-center flex-col gap-[20px]'>
        <button className='bg-white text-black px-6 py-2 rounded-md font-bold cursor-pointer hover:bg-gray-300 transition' onClick={() => navigate("/login")}>
          Login
        </button>
        Page Not Found
    </div>
  )
}

export default NotFound
