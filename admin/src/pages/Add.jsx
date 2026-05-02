import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload.png'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  let [image1, setImage1] = React.useState(null)
  let [image2, setImage2] = React.useState(null)
  let [image3, setImage3] = React.useState(null)
  let [image4, setImage4] = React.useState(null)
  let [name, setName] = React.useState("")
  let [description, setDescription] = React.useState("")
  let [price, setPrice] = React.useState("")
  let [category, setCategory] = React.useState("Men")
  let [subCategory, setSubCategory] = React.useState("TopWear")
  let [bestseller, setBestseller] = React.useState(false)
  let [sizes,setSizes] = React.useState([])
  let [loading,setLoading] = React.useState(false)

  let {serverUrl} = useContext(authDataContext)
  const handleAddProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
try {
  let formData = new FormData()
  if (image1) formData.append("image1", image1)
  if (image2) formData.append("image2", image2)
  if (image3) formData.append("image3", image3)
  if (image4) formData.append("image4", image4)
  formData.append("name", name)
  formData.append("description", description)
  formData.append("price", price)
  formData.append("category", category)
  formData.append("subCategory", subCategory)
  formData.append("bestseller", bestseller.toString())
  formData.append("sizes", JSON.stringify(sizes))
  
  let result = await axios.post(serverUrl+"/api/product/addproduct", formData, {withCredentials:true})
  console.log(result.data)
  toast.success("Product added successfully")
  setLoading(false)
  if(result.data){
      setName("")
      setDescription("")
      setPrice("")
      setCategory("Men")
      setSubCategory("TopWear")
      setBestseller(false)
      setSizes([])
      setImage1(false)
      setImage2(false)
      setImage3(false)
      setImage4(false)
  }
} catch (error) {
  console.error(error)
  toast.error("Failed to add product")
  setLoading(false)
}
  }
  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white overflow-x-hidden relative'>
      <Nav/>
      <Sidebar/>

      <div className='w-[82%] h-[100%] flex items-center justify-start overflow-x-hidden absolute right-0 bottom-[5%] mt-[70px]'> 

        <form action="" onSubmit={handleAddProduct} className='w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[30px] py-[30px] px-[20px] md:px-[60px]'>
        <div className='w-[400px] h-[50px] md:text-[40px] text-[25px] mt-[70px]'>Add Product Page</div>
        <div className='w-[80%] h-[130px] flex items-start justify-center flex-col gap-[10px] mt-[20px]'>
          <span className='text-[20px] md:text-[25px] font-semibold'>Upload Images</span>
          <div className='w-[100%] h-[100%] flex items-center justify-start'>
            <label htmlFor="image1" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] flex  cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image1 ? upload : URL.createObjectURL(image1)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
              <input type="file" id='image1' className='hidden' onChange={(e) => setImage1(e.target.files[0])}/>
            </label>
            <label htmlFor="image2" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] flex  cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image2 ? upload : URL.createObjectURL(image2)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
              <input type="file" id='image2' className='hidden' onChange={(e) => setImage2(e.target.files[0])}/>
            </label>
            <label htmlFor="image3" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] flex  cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image3 ? upload : URL.createObjectURL(image3)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
              <input type="file" id='image3' className='hidden' onChange={(e) => setImage3(e.target.files[0])}/>
            </label>
            <label htmlFor="image4" className='w-[65px] h-[65px] md:w-[100px] md:h-[100px] flex  cursor-pointer hover:border-[#46d1f7]'>
              <img src={!image4 ? upload : URL.createObjectURL(image4)} alt="" className='w-[80%] h-[80%] rounded-lg shadow-2xl hover:border-[#1d1d1d] border-[2px]'/>
              <input type="file" id='image4' className='hidden' onChange={(e) => setImage4(e.target.files[0])}/>
            </label>
          </div>
        </div>

        <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
          <p className='text-[20px] md:text-[25px] font-semibold'>Product Name</p>
          <input type="text" placeholder='Enter product name' className='w-[600px] max-w-[90%] h-[40px] px-[10px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 text-[18px] placeholder:text-[#ffffffc2]' onChange={(e) => setName(e.target.value)} value={name} required/>
        </div>

       <div className='w-[80%] flex items-start justify-center flex-col gap-[10px]'>
          <p className='text-[20px] md:text-[25px] font-semibold'>Product Description</p>
          <textarea type="text" placeholder='Enter product description' className='w-[60%] bg-slate-600 py-[7px] px-[10px] rounded-lg hover:border-[#46d1f7] border-[2px] ' onChange={(e) => setDescription(e.target.value)} value={description} required/>
        </div>

        <div className='w-[80%] flex items-center gap-[10px] flex-wrap'>
          <div className='md:w-[30%] w-[100%] flex item-start sm:justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Product Category</p>
            <select value={category} className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px] ' onChange={(e) => setCategory(e.target.value)}>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className='md:w-[30%] w-[100%] flex item-start sm:justify-center flex-col gap-[10px]'>
            <p className='text-[20px] md:text-[25px] font-semibold'>Subcategory</p>
            <select value={subCategory} className='bg-slate-600 w-[60%] px-[10px] py-[7px] rounded-lg hover:border-[#46d1f7] border-[2px] ' onChange={(e) => setSubCategory(e.target.value)}>
              <option value="TopWear">TopWear</option>
              <option value="BottomWear">BottomWear</option>
              <option value="WinterWear">WinterWear</option>
            </select>
          </div>
        </div>
         <div className='w-[80%] h-[100px] flex items-start justify-center flex-col gap-[10px]'>
          <p className='text-[20px] md:text-[25px] font-semibold'>Product Price</p>
          <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='₹2000' className='w-[600px] max-w-[90%] h-[40px] px-[10px] rounded-lg hover:border-[#46d1f7] border-[2px] cursor-pointer bg-slate-600 text-[18px] placeholder:text-[#ffffffc2]' required />
         </div>
        <div className='w-[80%] h-[220px] md:h-[100px] flex items-start justify-center flex-col gap-[10px] py-[10px] md:py-[0px]'>
          <p className='text-[20px] md:text-[25px] font-semibold'>Product Sizes</p>
          <div className='flex items-center justify-start gap-[15px] flex-wrap'>
            <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("S") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>S</div>
            <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("M") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>M</div>
            <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("L") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>L</div>
            <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("XL") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>XL</div>
            <div className={`px-[20px] py-[7px] rounded-lg bg-slate-600 text-[18px] hover:border-[#46d1f7] border-[2px] cursor-pointer ${sizes.includes("XXL") ? "bg-green-400 text-black border-[#46d1f7]" : ""}`}onClick={()=>setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>XXL</div>
          </div>
        </div>
        <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[20px]'>
          <input type="checkbox" className='w-[25px] h-[25px] cursor-pointer' id="checkbox" checked={bestseller} onChange={()=> setBestseller(prev => !prev)}/>
          <label htmlFor="checkbox"className='text-[18px] md:text-[22px] font-semibold'>Add to BestSeller</label>
        </div>
        <button className='w-[140px] px-[20px] py-[20px] rounded-xl bg-[#65d8f7] flex items-center justify-center gap-[10px] text-black active:bg-slate-700 active:text-white active:border-[2px] border-white'>{loading ? <Loading /> : "Add Product"}</button>
        </form>
      </div>
    </div>
  )
}

export default Add