import { useState, useEffect } from "react";
import axios from "../config/axios";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
  try {
    console.log("API CALL START");

    const res = await axios.get("/api/product/list");

    console.log("API RESPONSE:", res.data);

    setProducts(res.data);

  } catch (err) {
    console.log("API ERROR:", err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

export default useProducts;