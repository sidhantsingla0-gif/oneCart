import React from 'react'
import { useNavigate } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
function Card({name , image , id , price}) {
    let {currency} = React.useContext(shopDataContext)
    let navigate = useNavigate()
    let {serverUrl} = React.useContext(authDataContext)
    // Remove 'public/' prefix since express.static serves from public folder at root
    const imagePath = image ? image.replace('public/', '') : ''
    const imageUrl = imagePath ? `${serverUrl}/${imagePath}` : ''
  return (
    <div className='w-[300px] max-w-[90%] h-[400px] bg-[#ffffff0a] backdrop:blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]' onClick={() => navigate(`/productdetail/${id}`)}>
      <img src={imageUrl} alt={name} className='w-[100%] h-[80%] rounded-sm object-cover'/>
      <div>
        <h3 className='text-[18px] py-[10px] font-bold text-white'>{name}</h3>
        <p className='text-[20px] font-bold text-blue-100'>{currency}{price}</p>
      </div>
    </div>
    
  )
}

export default Card
