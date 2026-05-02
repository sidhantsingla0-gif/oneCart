import React from "react";
import { useNavigate } from "react-router-dom";
import Tittle from "../component/Tittle";
import CartTotal from "../component/cartTotal";
import razorpay from "../assets/Razorpay.png"
import { shopDataContext } from "../context/ShopContext.jsx";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { toast } from 'react-toastify';

function PlaceOrder() {
    let [method, setMethod] = React.useState("cod")
    let [isLoading, setIsLoading] = React.useState(false)
    let navigate = useNavigate()
    const { cartItems,setCartItems,getCartAmount, delivery_fee, products } = React.useContext(shopDataContext);
    let {serverUrl} = React.useContext(authDataContext)
    let [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        phoneNumber: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        if (!order || !order.amount || !order.currency || !order.id) {
          console.error('Invalid Razorpay order object:', order);
          return;
        }

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount * 100,
          currency: order.currency.toUpperCase(),
          name: "Order Payment",
          description: "Order Payment",
          order_id: order.id,
          handler: async (response) => {
            console.log(response)
            // Here, send the response to backend to verify payment
            try {
              const { data } = await axios.post(serverUrl + '/api/order/verifyrazorpay', response, { withCredentials: true });
              if (data.success) {
                setCartItems({});
                toast.success("Payment successful!")
                navigate('/order');
              } else {
                toast.error(data.message || 'Payment verification failed');
              }
            } catch (err) {
              console.error('Payment verification error:', err);
              toast.error('Payment verification failed');
            }
          }
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

   const onSubmitHandler = async (e) => {
  e.preventDefault();
  setIsLoading(true)
  console.log(formData);
  try {
    let orderItems = [];

    for (const items in cartItems) {   // ✅ fixed: cartItems
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );

          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    let orderData = {
        address : formData,
        items : orderItems,
        amount : getCartAmount() + delivery_fee,
    }
    console.log(orderData);

    switch (method) {
        case "cod":
            const result = await axios.post(serverUrl + '/api/order/placeorder', orderData, { withCredentials: true });
            console.log(result.data);
            if(result.data) {
                setCartItems({});
                toast.success("Order placed successfully!")
                navigate('/order')
            }else{
                toast.error(result.data.message || "Order failed")
            }
            break;
            case "razorpay":
            const resultRazorpay = await axios.post(serverUrl + '/api/order/razorpay', orderData, { withCredentials: true });
            initPay(resultRazorpay.data.order);
            break;

             default:
        break;
    } 
   
  } catch (err) {
    console.error(err);
    toast.error("Order failed")
  } finally {
    setIsLoading(false)
  }
};

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#141414] to-[#0c2025] text-white relative md:flex-row">
     <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]">
        <form onSubmit={onSubmitHandler} className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]">
            <div className="py-2.5">
                <Tittle text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>

             <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            placeholder="First name"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="firstName" value={formData.firstName}
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
            required onChange={onChangeHandler} name="lastName" value={formData.lastName}
          />
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="email"
            placeholder="Email Address"
            className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="email" value={formData.email}
          />
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            placeholder="Street"
            className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="street" value={formData.street}
          />
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            placeholder="City"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="city" value={formData.city}
          />
          <input
            type="text"
            placeholder="State"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
            required onChange={onChangeHandler} name="state" value={formData.state}
          />
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            placeholder="PinCode"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="pinCode" value={formData.pinCode}
          />
            <input
            type="text"
            placeholder="Country"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
            required onChange={onChangeHandler} name="country" value={formData.country}
          />
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            placeholder="Phone Number"
            className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="phoneNumber" value={formData.phoneNumber}
          />
        </div>
       <div className="w-full flex justify-center mt-[20px]">
  <button 
    type="submit"
    className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#3bceea48] 
               py-[10px] px-[50px] rounded-2xl text-white flex items-center 
               justify-center gap-[20px] border-[1px] border-[#808084a9]"
    disabled={isLoading}
  >
    {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : "PLACE ORDER"}
  </button>
</div>
      </form>
     </div>
     <div className='lg:w-[50%] w-[100%] min-h-[100vh] flex items-center justify-center gap-[30px]'>
  <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>
    <CartTotal/>
     <div className="py-2.5">
                <Tittle text1={'PAYMENT '} text2={'METHOD'} />
            </div>
            <div className="w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]">

  <button
    onClick={() => setMethod('razorpay')}
    className={`w-[150px] h-[50px] rounded-sm ${
      method === 'razorpay'
        ? 'border-[5px] border-blue-900 rounded-sm'
        : ''
    }`}
  >
    <img
      src={razorpay}
      className="w-[100%] h-[100%] object-fill rounded-sm"
      alt=""
    />
  </button>

  <button
    onClick={() => setMethod('cod')}
    className={`w-[200px] h-[50px] bg-gradient-to-r from-[#95b3f8] to-white text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${
      method === 'cod'
        ? 'border-[5px] border-blue-900 rounded-sm'
        : ''
    }`}
  >
    CASH ON DELIVERY
  </button>

</div>
  </div>
</div>

     </div>
  );
}

export default PlaceOrder;
