import React from 'react'
import Tittle from '../component/Tittle'
import contact from '../assets/contact.png'
import NewLetterBox from '../component/NewLetterBox'
function Contact() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-r from-[#141414] to-[#0c2025] gap-[50px] overflow-hidden pt-[20px]'>
      
      <Tittle text1={'CONTACT'} text2={'US'} />

      <div className='w-full flex items-center justify-center flex-col lg:flex-row gap-[20px]'>
        <div className='lg:w-[50%] w-full flex items-center justify-center'>
          <img src={contact} alt="Contact Us" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-lg'/>
        </div>
        <div className='lg:w-[50%] w-full flex items-center justify-center gap-[20px] flex-col mt-[20px] lg:mt-0'>
          <p className='lg:w-[80%] w-full text-white font-bold lg:text-[18px] text-[15px]'>
            Our Store
          </p>
          <p className='lg:w-[80%] w-full text-white md:text-[16px] text-[13px]'>
            123 Main Street, City, State 12345
          </p>
          <p className='lg:w-[80%] w-full text-white md:text-[16px] text-[13px]'>
            Phone: (123) 456-7890
          </p>
          <p className='lg:w-[80%] w-full text-white md:text-[16px] text-[13px]'>
            Email: info@ourstore.com
          </p>
           <p className='lg:w-[80%] w-full text-white font-bold lg:text-[18px] text-[15px]'>Careers at OneCart</p>
           <p className='lg:w-[80%] w-full text-white md:text-[16px] text-[13px]'>
             Join our team and help us create the best shopping experience!
           </p>
           <button className='px-[30px] py-[20px] flex items-center justify-center text-white bg-transparent border active:bg-slate-600 rounded-md self-center'>
             Explore Jobs
           </button>
        </div>
      </div>
<NewLetterBox />
    </div>
  )
}

export default Contact