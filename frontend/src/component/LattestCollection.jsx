import React from 'react'
import Tittle from './Tittle'
import Card from './Card'
import { shopDataContext } from '../context/ShopContext.jsx'
import SkeletonCard from "./SkeletonCard.jsx";

function LattestCollection() {

    const { products, loading } = React.useContext(shopDataContext);
    const [latestProducts, setLatestProducts] = React.useState([])

    React.useEffect(() => {
        setLatestProducts(products.slice(0, 8))
    }, [products])

    return (
        <div className="w-full">

            {/* TITLE */}
            <div className="text-center mb-10">
  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
     <Tittle text1={"LATEST"} text2={"COLLECTION"} />
  </h1>
  <p className="text-gray-500 mt-2 text-sm md:text-base">
   Step Into Style - New Collection Dropping This Season
  </p>
</div>


            {/* PRODUCT GRID */}
             <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-2 md:px-0">
            {loading
  ? Array(8).fill("").map((_, index) => (
      <SkeletonCard key={index} />
    ))
  : latestProducts.map((item, index) => (
      <Card
        key={index}
        name={item.name}
        image={item.image1}
        id={item._id}
        price={item.price}
      />
    ))
}
</div>
        </div>
    )
}

export default LattestCollection