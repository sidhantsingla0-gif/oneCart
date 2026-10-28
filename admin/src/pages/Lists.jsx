import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Lists() {
  const [list, setList] = useState([])
  const { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + '/api/product/list')
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeProduct = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if(result.data){
          fetchList()
          toast.success("Product removed successfully")
      }
      else{
          toast.error("Failed to remove product")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to remove product")
    }
  }

  useEffect(() => {
    fetchList()
  }, [serverUrl])

  const getImageUrl = (image) => {
    if (!image) return '/fallback.png'
    if (image.startsWith('http')) return image

    const normalized = image
      .replace(/\\/g, '/')
      .replace(/^(public\/|\/public\/)/, '')
      .replace(/^\/+/, '')

    return `${serverUrl}/${normalized}`
  }

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white'>
      <Nav />
        <div className='w-[100%] h-[100%] flex items-center justify-start'>
          <Sidebar />
          <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>
            <div className='w-[400px] h-[50px] text-[28px] md:text-[40px] text-white'>All Listed Products</div>
            {
              list?.length > 0 ? (
                <div className='flex flex-col gap-4'>
                  {list.map((item, index) => {
                    const imageUrl = getImageUrl(item.image1)
                    return (
                      <div key={item._id || index} className='w-full md:h-[120px] bg-slate-600 rounded-xl flex items-center justify-between p-[10px] md:px-[30px]'>
                        <div className='flex items-center gap-[10px]'>
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className='w-[80px] h-[80px] md:w-[120px] md:h-[100px] rounded-lg object-cover'
                          />
                          <div className='flex flex-col items-start justify-center'>
                            <div className='md:text-[20px]'>{item.name}</div>
                            <div className='md:text-[18px]'>{item.category}</div>
                            <div className='md:text-[18px]'>₹{item.price}</div>
                          </div>
                        </div>
                        <span className='w-[35px] h-[30px] flex items-center justify-center rounded-md md:hover:bg-red-300 md:hover:text-black cursor-pointer hover:text-red-300'onClick={() => removeProduct(item.
                          _id
                        )}>X</span>
                      </div>

                    )
                  })}
                </div>
              ) : (
                <div className='text-white text-lg'>No products available</div>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Lists
