import React from 'react'
import Tittle from '../component/Tittle'
import contact from '../assets/contact.png'
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#141414] to-[#0c2025] text-white py-12 px-4">

      <div className="max-w-7xl mx-auto flex flex-col gap-16">

        {/* TITLE */}
        <Tittle text1={'CONTACT'} text2={'US'} />

        {/* MAIN SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* IMAGE */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={contact}
              alt="Contact"
              className="w-[80%] lg:w-[70%] rounded-xl shadow-xl border border-white/10 hover:scale-105 transition"
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">

            {/* STORE INFO */}
            <div className="bg-[#ffffff0a] border border-gray-700 p-6 rounded-xl flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#bff1f9]">Our Store</h3>
              <p className="text-gray-300">123 Main Street, City, State 12345</p>
              <p className="text-gray-300">Phone: (123) 456-7890</p>
              <p className="text-gray-300">Email: info@ourstore.com</p>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-[#ffffff0a] border border-gray-700 p-6 rounded-xl flex flex-col gap-4">

              <h3 className="text-lg font-semibold text-[#bff1f9]">Send Message</h3>

              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 outline-none"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 outline-none"
              />

              <textarea
                placeholder="Your Message"
                rows="4"
                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-600 outline-none"
              ></textarea>

              <button className="bg-white text-black py-2 rounded-md hover:bg-gray-200 transition">
                Send Message
              </button>

            </div>

            {/* CAREERS */}
            <div className="bg-[#ffffff0a] border border-gray-700 p-6 rounded-xl flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-[#bff1f9]">Careers at OneCart</h3>
              <p className="text-gray-300">
                Join our team and help us create the best shopping experience!
              </p>
              <button className="mt-2 border border-gray-500 py-2 rounded-md hover:bg-gray-700 transition">
                Explore Jobs
              </button>
            </div>

          </div>

        </div>

        {/* NEWSLETTER */}
        <NewLetterBox />

      </div>

    </div>
  )
}

export default Contact