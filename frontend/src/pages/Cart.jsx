import React from 'react'
import CartTotal from '../component/cartTotal.jsx'
import Tittle from '../component/Tittle'
import { shopDataContext } from '../context/ShopContext.jsx'
import { authDataContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBinLine } from "react-icons/ri";

function Cart() {
  const { products, cartItems, currency, updateQuantity } = React.useContext(shopDataContext)
  const { serverUrl } = React.useContext(authDataContext)
  const [cartProducts, setCartProducts] = React.useState([])
  const navigate = useNavigate()

  React.useEffect(() => {
    const tempData = [];
    for (let items in cartItems) {
      for (let item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartProducts(tempData);
  }, [cartItems, products]);

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-r from-[#141414] to-[#0c2025]'>
      <div className='h-[8%] w-full text-center mt-[80px]'>
        <Tittle text1={'YOUR'} text2={'CART'}/>
      </div>

      <div className='w-full h-[92%] flex flex-wrap gap-[20px]'>
        {cartProducts.map((item, index) => {
          const productData = products.find(product => product._id === item._id);

          // ✅ Fix image path like in Order
          const imagePath = productData?.image1 ? productData.image1.replace("public/", "") : "";
          const imageUrl = imagePath ? `${serverUrl}/${imagePath}` : "";

          return (
            <div key={index} className='w-[100%] h-[10%] border-t border-b'>
              <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative'>
                <img
                  src={imageUrl}
                  alt={productData?.name || "product"}
                  className='w-[100px] h-[100px] object-cover rounded-md'
                />
                <div className="flex items-start justify-center flex-col gap-[10px]">
                  <p className="md:text-[25px] text-[20px] text-[#f3f9fc]">
                    {productData?.name}
                  </p>
                  <div className="flex items-center gap-[20px]">
                    <p className="text-[20px] text-[#aaf4e7]">
                      {currency}{productData?.price}
                    </p>
                    <p className="w-[40px] h-[40px] text-[16px] text-white bg-[#51808b4] rounded-md mt-[5px] flex items-center justify-center border-[1px] border-[#9ff9f9]">
                      {item.size}
                    </p>
                  </div>
                </div>
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className="md:max-w-20 max-w-10 md:py-2 py-[5px] px-[10px] text-white text-[18px] font-semibold bg-[#51888b04] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9ff9f9] rounded-md"
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === null
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                />
                <RiDeleteBinLine
                  className='text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50px] md:top-[40px] md:right-[5%] right-1'
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button
            className="hover:bg-slate-500 cursor-pointer bg-[#5188048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#8088049] ml-[30px] mt-[20px]"
            onClick={() => {
              if (cartProducts.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("your cart is empty!")
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
