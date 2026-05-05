import React from 'react'
import CartTotal from '../component/cartTotal.jsx'
import Tittle from '../component/Tittle'
import { shopDataContext } from '../context/ShopContext.jsx'
import { authDataContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBinLine } from "react-icons/ri";

function Cart() {

  const { products, cartItems, currency, updateQuantity } = React.useContext(shopDataContext)
  const { serverUrl } = React.useContext(authDataContext)
  const [cartProducts, setCartProducts] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    const tempData = []
    for (let items in cartItems) {
      for (let item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartProducts(tempData)
  }, [cartItems, products])

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] text-white py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* TITLE */}
        <div className="text-center mb-10">
          <Tittle text1={'YOUR'} text2={'CART'} />
        </div>

        {/* CART ITEMS */}
        <div className="flex flex-col gap-6">

          {cartProducts.map((item, index) => {

            const productData = products.find(p => p._id === item._id)

            const imagePath = productData?.image1 ? productData.image1.replace("public/", "") : ""
            const imageUrl = imagePath ? `${serverUrl}/${imagePath}` : ""

            return (
              <div key={index}
                className="flex flex-col md:flex-row items-center gap-6 
                bg-[#ffffff0a] border border-gray-700 rounded-xl p-4">

                {/* IMAGE */}
                <img
                  src={imageUrl}
                  alt={productData?.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                {/* INFO */}
                <div className="flex-1 flex flex-col gap-2 text-center md:text-left">
                  <p className="text-lg font-semibold">
                    {productData?.name}
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-300">
                    <span>{currency}{productData?.price}</span>
                    <span className="px-2 py-1 border border-gray-500 rounded">
                      Size: {item.size}
                    </span>
                  </div>
                </div>

                {/* QUANTITY */}
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className="w-16 px-2 py-1 bg-transparent border border-gray-500 rounded text-center"
                />

                {/* DELETE */}
                <RiDeleteBinLine
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="text-red-400 w-6 h-6 cursor-pointer hover:scale-110 transition"
                />

              </div>
            )
          })}

        </div>

        {/* TOTAL + BUTTON */}
        <div className="mt-12 flex flex-col items-end gap-4">

          <div className="w-full sm:w-[400px]">
            <CartTotal />
          </div>

          <button
            onClick={() => {
              if (cartProducts.length > 0) {
                navigate("/placeorder")
              } else {
                alert("Cart is empty")
              }
            }}
            className="bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            PROCEED TO CHECKOUT
          </button>

        </div>

      </div>

    </div>
  )
}

export default Cart
