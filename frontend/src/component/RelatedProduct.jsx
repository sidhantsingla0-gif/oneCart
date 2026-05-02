import React from 'react'
import Tittle from './Tittle'
import Card from './Card'
import { shopDataContext } from '../context/ShopContext.jsx'
function RelatedProduct({category,subCategory,currentProductId}) {
    let {products} = React.useContext(shopDataContext)
    let [related, setRelated] = React.useState([])

    React.useEffect(() => {
        if(products.length > 0){
            let productsCopy = products.slice()
            productsCopy = productsCopy.filter((item) => category === item.category )
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory )
            productsCopy = productsCopy.filter((item) => item.id !== currentProductId )
            setRelated(productsCopy.slice(0,4))
        }
    }, [category, subCategory, products, currentProductId])
  return (
    <div className='my-[130px] md:my-[40px] md:px-[60px]'>
      <div className='ml-[20px] lg:ml-[80px]'>
        <Tittle text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>
        <div className='w-[100%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]'>
          {related.map((item,index) => (
           <Card key={index} id={item} name={item.name} price={item.price} image={item.image1}/>
          ))}
        </div>
    </div>
  )
}

export default RelatedProduct