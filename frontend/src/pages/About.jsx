import React from 'react'
import Tittle from '../component/Tittle'
import about from '../assets/about.png'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] text-white py-12 px-4">

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* TITLE */}
        <Tittle text1={'ABOUT'} text2={'US'} />

        {/* MAIN SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-10">

          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={about}
              alt="About Us"
              className="w-[80%] lg:w-[70%] rounded-xl shadow-xl border border-white/10 
              hover:scale-105 transition duration-300"
            />
          </div>

          {/* TEXT */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5 text-gray-300">

            <p>
              At One Cart, we are passionate about providing our customers with a seamless
              and enjoyable shopping experience. Our mission is to offer a wide range of
              high-quality products at competitive prices.
            </p>

            <p>
              We believe in the power of technology to connect people with the products they love.
              Our platform is designed to be easy to navigate, secure, and reliable.
            </p>

            <h3 className="text-lg font-semibold text-white mt-2">Our Mission</h3>

            <p>
              Our mission is to provide high-quality products, competitive pricing,
              and excellent customer service while ensuring a secure and convenient
              shopping experience.
            </p>

          </div>

        </div>

        {/* WHY CHOOSE US */}
        <div className="flex flex-col gap-8">

          <Tittle text1={'WHY'} text2={'CHOOSE US'} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#ffffff0b] border border-gray-700 p-6 rounded-xl text-center 
            hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <h3 className="text-lg font-semibold text-[#bff1f9] mb-2">
                Quality Assurance
              </h3>
              <p className="text-gray-300">
                We guarantee the quality of all our products with an easy return policy.
              </p>
            </div>

            <div className="bg-[#ffffff0b] border border-gray-700 p-6 rounded-xl text-center 
            hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <h3 className="text-lg font-semibold text-[#bff1f9] mb-2">
                Convenience
              </h3>
              <p className="text-gray-300">
                Enjoy a smooth shopping experience with fast delivery.
              </p>
            </div>

            <div className="bg-[#ffffff0b] border border-gray-700 p-6 rounded-xl text-center 
            hover:shadow-lg hover:-translate-y-1 transition duration-300">
              <h3 className="text-lg font-semibold text-[#bff1f9] mb-2">
                Customer Support
              </h3>
              <p className="text-gray-300">
                Our team is always ready to help you anytime.
              </p>
            </div>

          </div>

        </div>

        {/* NEWSLETTER */}
        <NewLetterBox />

      </div>

    </div>
  )
}

export default About