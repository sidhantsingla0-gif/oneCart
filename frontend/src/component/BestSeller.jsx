import React, { useEffect } from 'react'
import Tittle from './Tittle'
import { shopDataContext } from '../context/ShopContext.jsx'
import Card from './Card.jsx'
import SkeletonCard from "./SkeletonCard.jsx";

function BestSeller() {

    const { products,loading } = React.useContext(shopDataContext)
    const [bestSellerProducts, setBestSellerProducts] = React.useState([])

    if (loading) {
  return <p className="text-center">Loading...</p>;
}

   useEffect(() => {
  if (products.length > 0) {
    const filtered = products.filter(item => item.bestseller);
    setBestSellerProducts(filtered.slice(0, 4));
  }
}, [products])




console.log(products)


    return (
        <div className="w-full">

            {/* TITLE */}
            <div className="text-center mb-10">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
   <Tittle text1={"BEST"} text2={"SELLER"}/>
  </h1>
  <p className="text-gray-500 mt-2 text-sm md:text-base">
    Discover our most popular products
  </p>
</div>

            {/* GRID */}
           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">

  {loading
    ? Array(5).fill("").map((_, index) => (
        <SkeletonCard key={index} />
      ))
    : bestSellerProducts.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          id={item._id}
          price={item.price}
          image={item.image1}
        />
      ))}

</div>
        </div>
    )
}

export default BestSeller