import React from 'react'
import Tittle from '../component/Tittle'
import about from '../assets/about.png'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-r from-[#141414] to-[#0c2025] gap-[50px] overflow-hidden'>
      
      <Tittle text1={'ABOUT'} text2={'US'} />

      <div className='w-[100%] flex items-center justify-center flex-col lg:flex-row'>

        {/* Image Section */}
        <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
          <img 
            src={about} 
            alt="About Us"  
            className='lg:w-[65%] w-[80%] shadow-lg shadow-black/50 rounded-lg border border-white/10 transition-transform duration-300 hover:scale-105'
          />
        </div>

        {/* Text Section */}
        <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-0 lg:px-[30px]'>

          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            At One Cart, we are passionate about providing our customers with a seamless and enjoyable shopping experience. Our mission is to offer a wide range of high-quality products at competitive prices, all in one convenient online store.
          </p>

          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px]'>
            We believe in the power of technology to connect people with the products they love. Our platform is designed to be easy to navigate, secure, and reliable, ensuring a smooth shopping experience.
          </p>

          <p className='lg:w-[80%] w-[100%] text-white lg:text-[18px] mt-[10px] font-bold'>
            Our Mission
          </p>

          <p className='lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px] pb-[80px]'>
            Our mission is to provide high-quality products, competitive pricing, and excellent customer service while ensuring a secure and convenient shopping experience for everyone.
          </p>

        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className='w-[100%] flex items-center justify-center flex-col gap-[10px]'>
        <Tittle text1={'WHY'} text2={'CHOOSE US'} />

        <div className='w-[80%] flex items-center justify-center flex-col lg:flex-row gap-[20px] py-[40px]'>

          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] rounded-lg'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Quality Assurance</b>
            <p className='text-center'>We guarantee the quality of all our products with an easy return policy.</p>
          </div>

          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] rounded-lg'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Convenience</b>
            <p className='text-center'>Enjoy a smooth shopping experience with fast delivery.</p>
          </div>

          <div className='lg:w-[33%] w-[90%] h-[250px] border border-gray-100 flex items-center justify-center gap-[20px] flex-col px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] rounded-lg'>
            <b className='text-[20px] font-semibold text-[#bff1f9]'>Customer Support</b>
            <p className='text-center'>Our team is always ready to help you anytime.</p>
          </div>

        </div>
      </div>

      <NewLetterBox />
    </div>
  )
}

export default About