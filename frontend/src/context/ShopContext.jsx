import React, { useEffect, useState, useContext } from "react";
import { authDataContext } from "./authContext.jsx";
import { userDataContext } from "./UserContext.jsx"; // ✅ import userDataContext so we can check login
import axios from "axios";

export const shopDataContext = React.createContext();

function ShopContext({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData } = useContext(userDataContext); // ✅ get userData
  const [cartItems, setCartItems] = useState({});
  const currency = "₹";
  const delivery_fee = 40;

  // Fetch products
  const getProducts = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list", {
        withCredentials: true,
      });
      setProducts(result.data);
      console.log("Products loaded:", result.data);
    } catch (error) {
      console.error("Error loading products:", error.message);
    }
  };

  // Add to cart (local + server sync if logged in)
  const addToCart = async (itemId, size) => {
    if (!size) {
      console.log("Select product size");
      return;
    }

    // Local cart update
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    // Server sync if logged in
    if (userData) {
      try {
       let result = await axios.post(
          serverUrl + "/api/cart/add",
          { itemId, size },
          { withCredentials: true }
        );
        console.log(result);
      } catch (error) {
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  const getUserCart = async () => {
    try {
      const result = await axios.post(serverUrl + "/api/cart/get", {}, { withCredentials: true });
        setCartItems(result.data.cartData || {});
      } catch (error) {
        console.error("Error fetching user cart:", error.message);
      }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        try {
            let cartData = structuredClone(cartItems);
            cartData[itemId][size] = quantity;
            setCartItems(cartData);

            if (userData) {
                await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true });
            }
        } catch (error) {
            console.error("Error updating cart quantity:", error.message);
        }
    }

  // Count items in cart
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
    getProducts();
    getUserCart();
  }, []);

 const getCartAmount = () => {
  let totalAmount = 0;

  try {
    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

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
}; // ✅ this closing brace was missing

  const value = {
    products,
    currency,
    delivery_fee,
    getProducts,
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
