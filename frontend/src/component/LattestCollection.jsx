import React from 'react'
import Tittle from './Tittle'
import Card from './Card'
import { shopDataContext } from '../context/ShopContext.jsx'
function LattestCollection() {
        let {products} = React.useContext(shopDataContext)
        let [latestProducts, setLatestProducts] = React.useState([])
        React.useEffect(()=>{
            setLatestProducts(products.slice(0, 8));
        },[products])
  return (
    <div>
      <div className='h-[8%] w-[100%] text-center md:mt-[50px]'>
<Tittle text1={"LATEST"} text2={"COLLECTION"}/>
<p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100'>Step Into Style - New Collection Dropping This Season</p>
      </div>
      <div className='w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
        {latestProducts.map((item,index) => (
          <Card
            key={index}
            name={item.name}
            image={item.image1}
            id={item._id}
            price={item.price}
          />
        ))}</div>
    </div>
  )
}

export default LattestCollection
