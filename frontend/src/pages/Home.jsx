import React, { useEffect, useState } from 'react'
import Background from '../component/Background.jsx'
import Hero from '../component/Hero.jsx'
import Product from './Product.jsx'
import OurPolicy from '../component/OurPolicy.jsx'
import NewLetterBox from '../component/NewLetterBox.jsx'
import Footer from '../component/Footer.jsx'

function Home() {

  const heroData = [
    {
      text1: "One Cart",
      text2: "All Your Needs In One Cart",
      color: "text-white"
    },
    {
      text1: "Shop With Confidence",
      text2: "Best Quality Products",
      color: "text-yellow-300"
    },
    {
      text1: "Fast Delivery",
      text2: "At Your Doorstep",
      color: "text-green-300"
    },
    {
      text1: "Great Prices",
      text2: "Save More Everyday",
      color: "text-orange-400"
    }
  ];

  const [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === heroData.length - 1 ? 0 : prev + 1));
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="overflow-x-hidden pt-[80px] bg-gradient-to-r from-[#141414] to-[#0c2025] text-white">

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 px-4 py-12">

        {/* LEFT */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
            totalSlides={heroData.length}
          />
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 hidden md:block">
          <Background heroCount={heroCount} />
        </div>

      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Product />
      </div>

      {/* POLICY */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <OurPolicy />
      </div>

      {/* NEWSLETTER */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <NewLetterBox />
      </div>

      {/* FOOTER */}
      <Footer />

    </div>
  )
}

export default Home