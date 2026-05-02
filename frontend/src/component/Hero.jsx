import React from 'react'
import { FaCircle } from "react-icons/fa";

function Hero({heroData,heroCount,setHeroCount}) {
  return (
    <div className='relative z-10 flex h-full w-full items-center p-6 md:p-12'>
      <div className='max-w-xl space-y-8'>
        <div className={`text-[28px] md:text-[44px] lg:text-[56px] font-semibold leading-tight ${heroData.color}`}>
          <p>{heroData.text1}</p>
          <p>{heroData.text2}</p>
        </div>
        <div className='flex items-center gap-3'>
          {[0,1,2,3].map((index) => (
            <FaCircle
              key={index}
              className={`w-[14px] h-[14px] cursor-pointer ${heroCount === index ? 'fill-orange-400' : 'fill-white'}`}
              onClick={() => setHeroCount(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hero
