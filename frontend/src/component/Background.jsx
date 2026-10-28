import React from 'react'
import back1 from '../assets/back1.jpg'
import back2 from '../assets/back2.jpg'
import back3 from '../assets/back3.jpg'
import back4 from '../assets/back4.jpg'
function Background({heroCount}) {
  let bgSrc = back1
  if (heroCount === 0) bgSrc = back2
  else if (heroCount === 1) bgSrc = back3
  else if (heroCount === 2) bgSrc = back4

  return (
    <div className='w-full h-full'>
      <img src={bgSrc} alt="Hero background" className='w-full h-full object-cover' />
    </div>
  )
}

export default Background
