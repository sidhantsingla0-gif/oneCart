import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { IoSearch, IoClose } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext.jsx';
import { authDataContext } from '../context/authContext.jsx';
import { shopDataContext } from '../context/ShopContext.jsx';
import axios from "../config/axios"

function Nav() {

  const { getCurrentUser, userData, setUserData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)

  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      setUserData(null)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-700">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 text-white">

        {/* LOGO */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="w-8" />
          <h1 className="text-lg font-semibold">OneCart</h1>
        </div>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <button onClick={() => navigate("/")} className="hover:text-gray-300">Home</button>
          <button onClick={() => navigate("/collections")} className="hover:text-gray-300">Collections</button>
          <button onClick={() => navigate("/about")} className="hover:text-gray-300">About</button>
          <button onClick={() => navigate("/contact")} className="hover:text-gray-300">Contact</button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <button onClick={() => setShowSearch(prev => !prev)}>
            {showSearch ? <IoClose size={22} /> : <IoSearch size={22} />}
          </button>

          {/* CART */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <MdOutlineShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-600 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {getCartCount()}
            </span>
          </div>

          {/* USER */}
          <div
            onClick={() => setShowProfile(prev => !prev)}
            className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer text-sm"
          >
            {userData ? userData?.name?.slice(0, 1) : "U"}
          </div>

        </div>

      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className="w-full bg-[#0f172a] border-t border-gray-700 flex justify-center py-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[90%] md:w-[50%] px-4 py-2 rounded-md bg-gray-800 text-white outline-none"
          />
        </div>
      )}

      {/* PROFILE DROPDOWN */}
      {showProfile && (
        <div className="absolute right-4 mt-2 w-44 bg-[#111] text-white border border-gray-600 rounded-lg shadow-lg text-sm">
          {!userData && (
            <div
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </div>
          )}

          {userData && (
            <div
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          )}

          <div
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate('/order')}
          >
            Orders
          </div>

          <div
            className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
            onClick={() => navigate('/about')}
          >
            About
          </div>
        </div>
      )}

    </div>
  )
}

export default Nav