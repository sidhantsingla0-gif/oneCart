import React, { useEffect } from 'react'
import Background from '../component/Background.jsx'
import Hero from '../component/Hero.jsx'
import Product from './Product.jsx';
import OurPolicy from '../component/OurPolicy.jsx';
import NewLetterBox from '../component/NewLetterBox.jsx';
import Footer from '../component/Footer.jsx';
function Home() {
  let heroData = [
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

  let [heroCount,setHeroCount] = React.useState(0)
  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  return (
   <div className='overflow-x-hidden relative top-[70px]'>

  <div className='w-screen lg:h-screen md:h-[50vh] sm:h-[30vh] bg-gradient-to-r from-[#141414] to-[#0c2025] flex'>
 
    {/* LEFT SIDE - TEXT */}
    <div className='w-full md:w-2/5 flex items-center'>
      <Hero
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
        totalSlides={heroData.length}
      />
    </div>

    {/* RIGHT SIDE - IMAGE */}
    <div className='block w-3/5 h-full'>
      <Background heroCount={heroCount} />
    </div>

  </div>
  <Product/>
    <OurPolicy/>
    <NewLetterBox/>
    <Footer/>
</div>
  )
}

export default Home
