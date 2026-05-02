import React, { useContext, useState } from 'react'
import google from '../assets/googleLogo.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import { authDataContext } from '../context/authContext.jsx';
import { userDataContext } from '../context/UserContext.jsx';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase.js';
import { toast } from 'react-toastify';
function Login() {

  let [show, setShow] = useState(false)
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let [isLoading, setIsLoading] = useState(false)
  let {serverUrl} = useContext(authDataContext)
  let {getCurrentUser, setUserData} = useContext(userDataContext)



  let navigate = useNavigate()
  
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      let result = await axios.post(serverUrl + '/api/auth/login', {
        email,password
      },{withCredentials:true})
      console.log(result.data);
      toast.success("Login successful!")
      setUserData(result.data.user)
      navigate("/");


    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const googleLogin = async () => {
      setIsLoading(true)
      try {
        const response = await signInWithPopup(auth, provider);
        let user = response.user;
        let name = user.displayName;
        let email = user.email;
  
      const result = await axios.post(serverUrl + '/api/auth/googleLogin', {
    name,email
      },{withCredentials:true})
      console.log(result.data); 
      toast.success("Google login successful!")
      setUserData(result.data.user)
      navigate("/")
        
      } catch (error) {
        console.log(error);
        toast.error("Google login failed")
      } finally {
        setIsLoading(false)
      }
    }
  

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
    <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={()=>navigate("/")}>
    </div>
    <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
      <span className='text-[25px] font-semibold'>Login Page</span>
      <span className='text-[16px]'>Welcome to OneCart,Place your order</span>
    </div>
    <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
      <form action="" onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]'>
        <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin} style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
          <img src={google} alt="" className='w-[20px]' /> {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Login with Google"}
        </div>
        <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
          <div className='w-[40%] h-[1px] bg-[#96969635]'></div> Or <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
        </div>
        <div className='w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative'>
          <input type="email" className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm  rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email}/>
          <input type={show ? "text" : "password"} className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm  rounded-lg shadow-lg bg-transparent placeholder:[#ffffffc7] px-[20px] font-semibold" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
          {!show && (
            <IoEyeOutline
              className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[53%]"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          {show && (
            <IoEye
              className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[53%]"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
          <button className="w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" disabled={isLoading}>
            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "Login"}
          </button>
          <p className="flex gap-[10px]">You haven't any account?<span
          className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer" onClick={() => navigate("/signup")}>
            New User? Register
          </span>
            </p>
        </div>
      </form>
    </div>
    </div>
  )

}
export default Login
