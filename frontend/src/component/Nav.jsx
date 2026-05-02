import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext.jsx';
import { authDataContext } from '../context/authContext.jsx';
import { shopDataContext } from '../context/ShopContext.jsx';
import axios from 'axios';

function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext)
  let { serverUrl } = useContext(authDataContext)
  let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  let [showProfile, setShowProfile] = useState(false)
  let navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/auth/logout', { withCredentials: true });
      getCurrentUser();
      navigate('/login');
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileClick = () => setShowProfile(prev => !prev)

  return (
    <div className='w-full h-[70px] bg-[#ecfafaec] flex items-center justify-between px-[30px] shadow-md shadow-black relative'>
      
      {/* Logo */}
      <div className='w-[20%] lg:w-[30%] flex items-center gap-[10px]'>
        <img src={logo} alt="logo" className='w-[30px]'/>
        <h1 className='text-[25px] text-black font-sans'>OneCart</h1>
      </div>

     {/* Menu */}
<div className='w-[50%] hidden md:flex items-center justify-center'>
  <ul className='flex gap-[25px]'>
    <li 
      className='bg-black text-white px-6 py-2 rounded-md font-bold cursor-pointer hover:bg-gray-800 transition'
      onClick={() => navigate("/")}
    >
      HOME
    </li>
    <li 
      className='bg-black text-white px-6 py-2 rounded-md font-bold cursor-pointer hover:bg-gray-800 transition'
      onClick={() => navigate("/collections")}
    >
      COLLECTIONS
    </li>
    <li 
      className='bg-black text-white px-6 py-2 rounded-md font-bold cursor-pointer hover:bg-gray-800 transition'
      onClick={() => navigate("/about")}
    >
      ABOUT
    </li>
    <li 
      className='bg-black text-white px-6 py-2 rounded-md font-bold cursor-pointer hover:bg-gray-800 transition'
      onClick={() => navigate("/contact")}
    >
      CONTACT
    </li>
  </ul>
</div>


      {/* Right side */}
      <div className='w-[30%] flex items-center justify-end gap-[20px]'>
        {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-black cursor-pointer' onClick={()=>{setShowSearch(prev=>!prev);navigate("/collections")}}/>}
        {showSearch && <IoSearchCircleSharp className='w-[38px] h-[38px] text-black cursor-pointer' onClick={()=>setShowSearch(prev=>!prev)}/>}

        {!userData && <FaCircleUser className='w-[29px] h-[29px] text-black cursor-pointer' onClick={handleProfileClick} />}
        {userData && (
          <div className='w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer' onClick={handleProfileClick}>
            {userData?.name?.slice(0, 1)}
          </div>
        )}

        {/* Cart with badge */}
        <div className='relative'>
          <MdOutlineShoppingCart className='w-[30px] h-[30px] text-black cursor-pointer hidden md:block' onClick={()=>navigate("/cart")}/>
          <span className='absolute -top-3 -right-3 flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full shadow-md hidden md:flex'>
            {getCartCount()}
          </span>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className='w-full h-[80px] bg-[#d8f6f9dd] absolute top-full left-0 flex items-center justify-center'>
          <input type="text" placeholder='Search...' className='lg:w-[50%] w-[80%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] placeholder:text-white text-[18px]' onChange={(e)=>setSearch(e.target.value)} value={search}/>
        </div>
      )}

     {/* Profile dropdown */}
{showProfile && (
  <div className="absolute w-[220px] top-[110%] right-[4%] bg-[#111] border border-gray-600 rounded-lg z-10 shadow-xl">
    <ul className="flex flex-col text-[16px] py-2 text-white">
      {!userData && (
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition rounded-md"
          onClick={() => {
            navigate('/login');
            setShowProfile(false);
          }}
        >
          Login
        </li>
      )}
      {userData && (
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition rounded-md"
          onClick={() => {
            handleLogout();
            setShowProfile(false);
          }}
        >
          LogOut
        </li>
      )}
      <li
        className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition rounded-md"
        onClick={() => {
          navigate('/order');
          setShowProfile(false);
        }}
      >
        Orders
      </li>
      <li
        className="px-4 py-2 hover:bg-gray-700 cursor-pointer transition rounded-md"
        onClick={() => {
          navigate('/about');
          setShowProfile(false);
        }}
      >
        About
      </li>
    </ul>
  </div>
)}


      {/* Mobile bottom nav */}
      <div className='w-full h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] shadow-md shadow-black z-10 md:hidden'>
        <button className='mobile-btn' onClick={()=>navigate("/")}><IoMdHome className='w-[25px] h-[25px]'/>Home</button>
        <button className='mobile-btn' onClick={()=>navigate("/collections")}><HiOutlineCollection className='w-[25px] h-[25px]'/>Collections</button>
        <button className='mobile-btn' onClick={()=>navigate("/contact")}><MdContacts className='w-[25px] h-[25px]'/>Contact</button>
        <div className='relative'>
          <MdOutlineShoppingCart className='w-[25px] h-[25px]' onClick={()=>navigate("/cart")}/>
          <span className='absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs font-bold rounded-full shadow-md'>
            {getCartCount()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Nav
