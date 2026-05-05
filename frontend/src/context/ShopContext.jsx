import React, { useEffect, useState, useContext } from "react";
import { authDataContext } from "./authContext.jsx";
import { userDataContext } from "./UserContext.jsx";
import axios from "../config/axios"
import useProducts from "../hooks/useProducts";
export const shopDataContext = React.createContext();

function ShopContext({ children }) {
  
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext);
  const [cartItems, setCartItems] = useState({});
  const currency = "₹";
  const delivery_fee = 40;

  const { products, loading, error } = useProducts();

  const addToCart = async (itemId, size) => {
    if (!size) return console.log("Select product size");

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) cartData[itemId][size] += 1;
      else cartData[itemId][size] = 1;
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  const getUserCart = async () => {
  try {
    const result = await axios.post("/api/cart/get",
      {}
    );
    setCartItems(result.data.cartData || {});
  } catch (error) {
    if (error.response?.status !== 401) {
      console.error("Error fetching cart:", error.message);
    }
  }
};

  const updateQuantity = async (itemId, size, quantity) => {
    try {
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if (userData) {
        await axios.post("/api/cart/update",
          { itemId, size, quantity }
        );
      }
    } catch (error) {
      console.error("Error updating cart quantity:", error.message);
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    try {
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            totalCount += cartItems[itemId][size];
          }
        }
      }
    } catch (error) {
      console.error("Error calculating cart count:", error.message);
    }
    return totalCount;
  };

  

useEffect(() => {
  if (userData) {
    getUserCart(); // ✅ only when logged in
  }
}, [userData]);

  const getCartAmount = () => {
    let totalAmount = 0;

    try {
      for (const itemId in cartItems) {
        const itemInfo = products.find(
          (product) => product._id === itemId
        );

        if (itemInfo) {
          for (const size in cartItems[itemId]) {
            const quantity = cartItems[itemId][size];
            if (quantity > 0) {
              totalAmount += itemInfo.price * quantity;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error calculating cart amount:", error.message);
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCart,
    getCartCount,
    setCartItems,
    cartItems,
    updateQuantity,
    getCartAmount,
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContext;