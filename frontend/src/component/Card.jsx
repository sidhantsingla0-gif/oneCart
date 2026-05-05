import React from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'

function Card({ name, image, id, price }) {

    const { currency, addToCart, products } = React.useContext(shopDataContext)
    const { serverUrl } = React.useContext(authDataContext)
    const [selectedSize, setSelectedSize] = React.useState(null)
    const navigate = useNavigate()

    const imagePath = image ? image.replace('public/', '') : ''
    const imageUrl = imagePath ? `${serverUrl}/${imagePath}` : ''
    const product = products.find((item) => item._id === id)

   return (
  <div
    onClick={() => navigate(`/product/${id}`)}
    className="group bg-white rounded-2xl shadow-sm hover:shadow-lg 
    transition duration-300 overflow-hidden cursor-pointer"
  >

    {/* IMAGE */}
    <div className="w-full h-64 overflow-hidden bg-gray-100">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover 
        group-hover:scale-105 transition duration-300"
      />
    </div>

    {/* CONTENT */}
    <div className="p-4 flex flex-col">

      <h3 className="text-gray-800 text-sm md:text-base font-semibold truncate">
        {name}
      </h3>

      <p className="text-lg font-bold text-gray-900 mt-1">
        {currency}{price}
      </p>

    <div className="opacity-0 group-hover:opacity-100 transition">
  {product?.sizes?.map((size, index) => (
    <button
      key={index}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedSize(size)
      }}
      className={`px-2 py-1 text-xs border rounded 
        ${selectedSize === size 
          ? "bg-black text-white" 
          : "bg-white text-gray-700"}
      `}
    >
      {size}
    </button>
  ))}
</div>
      {/* BUTTON */}
    <button
  onClick={(e) => {
    e.stopPropagation()

    if (!selectedSize) {
      return alert("Please select size")
    }

    addToCart(id, selectedSize)
  }}
  className="mt-3 w-full bg-black text-white py-2 rounded-lg 
  hover:bg-gray-800 transition"
>
  Add to Cart
</button>

    </div>

  </div>
)
}

export default Card