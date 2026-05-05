import React from 'react'
import LattestCollection from '../component/LattestCollection.jsx'
import BestSeller from '../component/BestSeller.jsx'

function Product() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] py-12 text-white">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-16">

        {/* Latest Collection */}
        <LattestCollection />

        {/* Best Seller */}
        <BestSeller />

      </div>

    </div>
  )
}

export default Product