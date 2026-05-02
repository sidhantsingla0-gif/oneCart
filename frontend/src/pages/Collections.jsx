import React, { use, useEffect } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import Tittle from '../component/Tittle';
import { shopDataContext } from '../context/ShopContext.jsx'
import Card from '../component/Card';
function Collections() {
    let [showFilters, setShowFilters] = React.useState(false)
    let {products,search,showSearch} = React.useContext(shopDataContext)
    let [filteredProducts, setFilteredProducts] = React.useState([])
    let [category, setCategory] = React.useState([])
    let [subCategory, setSubCategory] = React.useState([])
    let [sortType, setSortType] = React.useState("relevant")


    const toggleCategory = (e)=>{
        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e)=>{
      if(subCategory.includes(e.target.value)){
          setSubCategory(prev => prev.filter(item => item !== e.target.value))
      } else {
          setSubCategory(prev => [...prev, e.target.value])
      }
    }
    const applyFilters = ()=>{
      let productsCopy = products.slice()
      if(showSearch && search){
        productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
      }

      if(category.length > 0){
        productsCopy = productsCopy.filter(product => category.includes(product.category))
      }
      if(subCategory.length > 0){
        productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory))
      }
      setFilteredProducts(productsCopy)
    }
    
      const sortProducts = (e)=>{
        let fbCopy = filteredProducts.slice()
        

        switch(sortType){
          case "low-high":
            setFilteredProducts(fbCopy.sort((a,b) => a.price - b.price))
            break;

          case "high-low":
            setFilteredProducts(fbCopy.sort((a,b) => b.price - a.price))
            break;
          default:           
           applyFilters()
           break;
        }

      }

      useEffect(()=>{
        sortProducts()
      },[sortType])

      useEffect(()=>{
        setFilteredProducts(products)
      },[products])

      useEffect(()=>{
        applyFilters()
      },[category, subCategory,search,showSearch])


  return (
    <div className='w-[100vw] min-h-[100vh]  bg-gradient-to-r from-[#141414] to-[#0c2025] flex items-start justify-start flex-col md:flex-row  overflow-x-hidden z-[2] pb-[110px]'>
      <div className={`md:w-[30vw] lg:w-[20vw] w-[100vw] md:min-h-[100vh] ${showFilters ? "h-[45vh]" : "h-[8vh]"} border-r-[1px] border-gray-400 text-[#aaf5fa] lg:fixed`}>
        <p className='text-[25px] font-semibold flex gap-[5px] items-center justify-start cursor-pointer ml-5' onClick={()=>setShowFilters(prev=>!prev)}>FILTERS
          {!showFilters && <FaChevronRight className='text-[18px] md:hidden'/>}
          {showFilters && <FaChevronDown className='text-[18px] md:hidden'/>}
        </p>

        <div className={`border-[2px] border-[#dedcdc] ml-5 mr-5 pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilters ?"" :"hidden"} md:block`}>
          <p className='text-[18px] text-white'>CATEGORIES</p>
          <div  className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Men'} className='w-3'onChange={toggleCategory} />Men</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory}/>Women</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Kids'} className='w-3' onChange={toggleCategory}/>Kids</p>
          </div>
        </div>
         <div className={`border-[2px] border-[#dedcdc] ml-5 mr-5 pl-5 py-3 mt-6 rounded-md bg-slate-600 ${showFilters ?"" :"hidden"} md:block`}>
          <p className='text-[18px] text-white'>SUB-CATEGORIES</p>
          <div  className='w-[230px] h-[120px] flex items-start justify-center gap-[10px] flex-col'>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Topwear'} className='w-3'onChange={toggleSubCategory} />Topwear</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'Bottomwear'} className='w-3' onChange={toggleSubCategory}/>Bottomwear</p>
            <p className='flex items-center justify-center gap-[10px] text-[16px] font-light'><input type="checkbox" value={'WinterWear'} className='w-3' onChange={toggleSubCategory}/>WinterWear</p>
          </div>
        </div>
      </div>

      <div className='lg:pl-[20%] md:py-[10px]'>
        <div className='md:w-[80vw] w-[100vw] p-[20px] flex justify-between flex-col lg:flex-row lg:px-[50px]'>
          <Tittle text1={"ALL"} text2={"COLLECTIONS"}/>
          <select name="" id="" className='bg-slate-600 w-[60%] md:w-[200px] h-[50px] text-white border=[2px] rounded-lg hover:border-[#46d1f7]' onChange={(e)=>setSortType(e.target.value)}>
            <option value="relevant" className='w-[100%] h-[100%]'>Sort by: Relevant</option>
            <option value="low-high" className='w-[100%] h-[100%]'>Sort by: Price: Low to High</option>
            <option value="high-low" className='w-[100%] h-[100%]'>Sort by: Price: High to Low</option>
          </select>
        </div>
        <div className='lg:w-[80vw] md:w-[60vw] w-[100vw] min-h-[70vh] flex items-center justify-center flex-wrap gap-[30px]'>
          {
            filteredProducts.map((item,index) => (
                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collections
