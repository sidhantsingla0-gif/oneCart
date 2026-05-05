import React, { useContext } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration' 
import Nav from './component/Nav'
import { userDataContext } from './context/UserContext'
import Collections from './pages/Collections'
import Contact from './pages/Contact'
import About from './pages/About'
import Product from './pages/Product'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Order from './pages/Order'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NotFound from './pages/NotFound'
import Ai from './component/Ai'
import VoiceTest from './VoiceTest'

function App() {
  let { userData, loading } = useContext(userDataContext)
  let location = useLocation()

  // ✅ Prevent flicker / false redirect
  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>
  }

  return (
    <div>
      {userData && <Nav />}

      <Routes>
        <Route
          path="/signup"
          element={
            userData
              ? <Navigate to={location.state?.from || "/"} />
              : <Registration />
          }
        />

        <Route
          path="/login"
          element={
            userData
              ? <Navigate to={location.state?.from || "/"} />
              : <Login />
          }
        />

        <Route
          path="/"
          element={
            userData
              ? <Home />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/collections"
          element={
            userData
              ? <Collections />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/contact"
          element={
            userData
              ? <Contact />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/about"
          element={
            userData
              ? <About />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/product"
          element={
            userData
              ? <Product />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/product/:productId"
          element={
            userData
              ? <ProductDetail />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/cart"
          element={
            userData
              ? <Cart />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/placeorder"
          element={
            userData
              ? <PlaceOrder />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/order"
          element={
            userData
              ? <Order />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
      <Ai />
      <VoiceTest />
    </div>
  )
}

export default App