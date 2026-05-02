import React, { useEffect } from 'react'
import Tittle from './Tittle'
import { shopDataContext } from '../context/ShopContext.jsx'
import Card from './Card.jsx'

function BestSeller() {
    let {products} = React.useContext(shopDataContext)
        let [bestSellerProducts, setBestSellerProducts] = React.useState([])

        useEffect(()=>{
            let filterProduct = products.filter((item)=> item.bestseller)
            setBestSellerProducts(filterProduct.slice(0, 4));
        },[products])
  return (
    <div>
      <div className='w-[100%] h-[8%] text-center mt-[50px]'>
        <Tittle text1={"BEST"} text2={"SELLER"}/>
        <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>Tried, Tested and Trusted, Loved Discover Our All-Time Best Sellers.</p>
      </div>
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {bestSellerProducts.map((item,index) => (
            <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1} />
        ))}
      </div>
    </div>
  )
}

export default BestSeller
