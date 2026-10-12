import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tittle from "../component/Tittle";
import CartTotal from "../component/cartTotal";
import razorpay from "../assets/Razorpay.png"
import { shopDataContext } from "../context/ShopContext.jsx";
import { userDataContext } from "../context/UserContext.jsx";
import axios from "../config/axios"
import { toast } from 'react-toastify';

function PlaceOrder() {
    let [method, setMethod] = React.useState("cod")
    let [isLoading, setIsLoading] = React.useState(false)
    let navigate = useNavigate()
    const { cartItems,setCartItems,getCartAmount, delivery_fee, products } = React.useContext(shopDataContext);
    const { userData } = React.useContext(userDataContext);
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

    useEffect(() => {
        if (!userData) {
            navigate("/login");
            return;
        }

        const nameParts = (userData.name || "").trim().split(" ");
        const defaultFirstName = nameParts[0] || "";
        const defaultLastName = nameParts.slice(1).join(" ") || "";

        setFormData((prev) => ({
            ...prev,
            firstName: prev.firstName || defaultFirstName,
            lastName: prev.lastName || defaultLastName,
            email: userData.email || prev.email,
        }));
    }, [userData, navigate]);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
            const numericValue = value.replace(/\D/g, "").slice(0, 10);
            setFormData(data => ({ ...data, phoneNumber: numericValue }));
            return;
        }
        if (name === "pinCode") {
            const numericValue = value.replace(/\D/g, "").slice(0, 6);
            setFormData(data => ({ ...data, pinCode: numericValue }));
            return;
        }
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
              const { data } = await axios.post('/api/order/verifyrazorpay', response);
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

  // 1. Validate First and Last Name
  if (formData.firstName.trim().length < 2) {
    toast.error("Please enter a valid first name (minimum 2 characters).");
    return;
  }
  if (formData.lastName.trim().length < 1) {
    toast.error("Please enter your last name.");
    return;
  }

  // 2. Validate Street Address
  if (formData.street.trim().length < 5) {
    toast.error("Please enter a detailed street address (minimum 5 characters).");
    return;
  }

  // 3. Validate City and State
  if (formData.city.trim().length < 2) {
    toast.error("Please enter a valid city name.");
    return;
  }
  if (formData.state.trim().length < 2) {
    toast.error("Please enter a valid state name.");
    return;
  }

  // 4. Validate PIN Code (6 digits)
  const pinRegex = /^[1-9]\d{5}$/;
  if (!pinRegex.test(formData.pinCode.trim())) {
    toast.error("Please enter a valid 6-digit PIN code.");
    return;
  }

  // 5. Validate Phone Number (10 digits starting with 6-9)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(formData.phoneNumber.trim())) {
    toast.error("Please enter a valid 10-digit mobile number starting with 6-9.");
    return;
  }

  setIsLoading(true)
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

    if (orderItems.length === 0) {
      toast.error("Your cart is empty. Please add items before placing an order.");
      setIsLoading(false);
      return;
    }

    let orderData = {
        address : formData,
        items : orderItems,
        amount : getCartAmount() + delivery_fee,
    }
    console.log(orderData);

    switch (method) {
        case "cod":
            const result = await axios.post('/api/order/placeorder', orderData);
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
            const resultRazorpay = await axios.post('/api/order/razorpay', orderData);
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
            minLength={2}
          />
          <input
            type="text"
            placeholder="Last name"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
            required onChange={onChangeHandler} name="lastName" value={formData.lastName}
            minLength={1}
          />
        </div>
        <div className="w-[100%] flex flex-col justify-center px-[10px] my-[5px]">
          <input
            type="email"
            placeholder="Email Address"
            className="w-[100%] h-[50px] rounded-md bg-slate-800 text-slate-300 cursor-not-allowed placeholder:text-slate-400 text-[18px] px-[20px] shadow-sm shadow-[#343434] border border-slate-600/40"
            readOnly
            title="Account email is locked to ensure order authenticity"
            name="email"
            value={formData.email}
          />
          <span className="text-[12px] text-emerald-400 mt-1 pl-1">✓ Verified Account Email</span>
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            placeholder="House / Flat No., Street, Landmark"
            className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="street" value={formData.street}
            minLength={5}
          />
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            placeholder="City"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="city" value={formData.city}
            minLength={2}
          />
          <input
            type="text"
            placeholder="State"
            className="w-[48%] h-[50px] rounded-md bg-slate-700 shadow-sm shadow-[#343434] placeholder:text-[white] text-[18px] px-[20px]"
            required onChange={onChangeHandler} name="state" value={formData.state}
            minLength={2}
          />
        </div>
        <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px]">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit PIN Code"
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
        <div className="w-[100%] flex flex-col justify-center px-[10px] my-[5px]">
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit Mobile Number"
            className="w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]"
            required onChange={onChangeHandler} name="phoneNumber" value={formData.phoneNumber}
          />
          {formData.phoneNumber && formData.phoneNumber.length > 0 && formData.phoneNumber.length < 10 && (
            <span className="text-[12px] text-amber-400 mt-1 pl-1">
              Must be exactly 10 digits ({10 - formData.phoneNumber.length} digits left)
            </span>
          )}
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
