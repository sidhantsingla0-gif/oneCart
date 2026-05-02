import React from 'react'
import LattestCollection from '../component/LattestCollection.jsx'
import BestSeller from '../component/BestSeller.jsx'
function Product() {
  return (
    <div className='w-[100vw] min:h-[100vh] bg-gradient-to-r from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[20px]'>
      
      <div className='w-[100%] min-h-[70px] flex items-center justify-center flex-col gap-[10px]'>
<LattestCollection />
      </div>
      <div className='w-[100%] min-h-[70px] flex items-center justify-center flex-col gap-[10px]'>
<BestSeller />
      </div>
    </div>
  )
}

export default Product