import React from 'react'
import logo from '../assets/logo.png'
function Footer() {
  return (
    <div className='w-[100%] md:h-[36vh] h-[21vh] mb-[77px] md:mb-[0px]'>
      <div className='w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-[#f5f5f5] flex items-center justify-between md:px-[50px] px-[5px]'>
        <div className='md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px] md:pr-[40px]'>
            <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]'>
                <img src={logo} alt="" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]'/>
                <p className='md:text-[20px] text-[19px] text-black'>OneCart</p>
            </div>
            <p className='text-[15px] text-gray-600 hidden md:block'>OneCart is your all-in-one online shopping destination, offering top-quality products, unlimited choices, and exceptional customer service. Designed to make your shopping experience seamless and enjoyable.</p>
            <p className='text-[15px] text-gray-600 md:hidden'>Fast. Easy. Reliable. OneCart Shopping</p>
        </div>
        <div className='md:w-[35%] w-[1/2] h-[100%] flex flex-col items-start justify-start text-left mt-[10px] md:mt-[40px]'>
            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans font-bold mb-[15px]'>COMPANY</p>
            <ul className='flex flex-col gap-[10px]'>
              <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:text-gray-600'>HOME</li>
              <li className='text-[15px] text-[#1e2223] cursor-pointer hover:text-gray-600'>About us</li>
              <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:text-gray-600'>Delivery</li>
              <li className='text-[15px] text-[#1e2223] cursor-pointer hover:text-gray-600'>Privacy Policy</li>
            </ul>
        </div>
        <div className='md:w-[35%] w-[1/2] h-[100%] flex flex-col items-start justify-start text-left mt-[10px] md:mt-[40px]'>
            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans font-bold mb-[15px]'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-[10px]'>
              <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:text-gray-600'>+91-9876543210</li>
              <li className='text-[15px] text-[#1e2223] cursor-pointer hover:text-gray-600'>contact@onecart.com</li>
              <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer hover:text-gray-600'>+1-234-567-8901</li>
              <li className='text-[15px] text-[#1e2223] cursor-pointer hover:text-gray-600'>admin@onecart.com</li>
            </ul>
        </div>
            
      </div>
      <div className='w-[100%] h-[1px] bg-slate-400'>
        <div className='w-[100%] h-[5vh] bg-[#dbfcfcec] flex items-center justify-center'>Copyright 2026@onecart.com.All Rights Reserved.</div>
      </div>
    </div>
  )
}

export default Footer
