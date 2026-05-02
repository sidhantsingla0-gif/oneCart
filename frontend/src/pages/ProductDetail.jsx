import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';

function ProductDetail() {
    let { productId } = useParams()
    let { products, currency, addToCart } = React.useContext(shopDataContext)
    let [productData, setProductData] = React.useState(false)

    const [image, setImage] = React.useState('')
    const [image1, setImage1] = React.useState('')
    const [image2, setImage2] = React.useState('')
    const [image3, setImage3] = React.useState('')
    const [image4, setImage4] = React.useState('')
    const [size, setSize] = React.useState('')

    const fetchProductData = () => {
        products.find(item => {
            if (String(item._id) === String(productId)) {
                setProductData(item)

                // ✅ default image = image1
                setImage(item.image1)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className="w-full min-h-screen flex flex-col items-center justify-start bg-gradient-to-r from-[#141414] to-[#0c2025] py-[40px]">

            {/* MAIN CONTAINER */}
            <div className="lg:w-[80vw] md:w-[95vw] flex flex-col lg:flex-row items-start justify-between gap-[30px]">

                {/* LEFT: thumbnails */}
                <div className="lg:w-[15%] w-full flex lg:flex-col flex-row gap-[10px]">
                    {[image1, image2, image3, image4].map((img, idx) => (
                        <div key={idx} className="md:w-[100px] w-[60px] h-[60px] md:h-[110px] bg-slate-300 border rounded-md">
                            <img
                                src={`http://localhost:8000/${img?.replace('public/', '')}`}
                                className="w-full h-full cursor-pointer rounded-md object-cover"
                                onClick={() => setImage(img)}
                            />
                        </div>
                    ))}
                </div>

                {/* CENTER: main image */}
                <div className="lg:w-[45%] w-full border rounded-md overflow-hidden flex items-center justify-center bg-black">
                    <img
                        src={image ? `http://localhost:8000/${image.replace('public/', '')}` : ''}
                        alt=""
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* RIGHT: product info */}
                <div className="lg:w-[35%] w-full flex flex-col gap-[20px] py-[10px] px-[10px] bg-[#141414]/40 rounded-md">

                    {/* Title */}
                    <h1 className="text-[28px] lg:text-[32px] font-semibold text-[aliceblue] leading-tight">
                        {productData.name?.toUpperCase()}
                    </h1>

                    {/* Rating row */}
                    <div className="flex items-center gap-[8px]">
                        <div className="flex items-center gap-1">
                            <FaStar className="text-[18px] fill-[#FFD700]" />
                            <FaStar className="text-[18px] fill-[#FFD700]" />
                            <FaStar className="text-[18px] fill-[#FFD700]" />
                            <FaStar className="text-[18px] fill-[#FFD700]" />
                            <FaStarHalfAlt className="text-[18px] fill-[#FFD700]" />
                        </div>
                        <p className="text-[14px] text-white">(123)</p>
                    </div>

                    {/* Price row */}
                    <p className="text-[28px] font-semibold text-white">
                        {currency} {productData.price?.toFixed(2)}
                    </p>

                    {/* Description row */}
                    <p className="text-[16px] lg:text-[18px] text-white leading-relaxed tracking-wide">
                        {productData.description}
                    </p>

                    {/* Size selector */}
                    <div className="flex flex-col my-[10px] gap-[10px]">
                        <p className="text-[25px] font-semibold pl-[5px] text-white">Select Size</p>

                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    className={`border py-2 px-4 rounded-md 
                                        ${item === size 
                                            ? 'bg-black text-[#2f97f1] text-[20px] font-semibold' 
                                            : 'bg-transparent text-white text-[18px]'}`}
                                    onClick={() => setSize(item)}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* Add to Cart button */}
                        <button className="text-[16px] active:bg-slate-500 cursor-pointer bg-[#495b61] py-[10px] px-[20px] rounded-2xl mt-[10px] border border-[#80808049] text-white shadow-black" onClick={()=>addToCart(productData._id,size)}>
                            Add to Cart
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="w-[90%] h-[1px] bg-slate-700"></div>

                    {/* Extra info */}
                    <div className="w-[80%] text-[16px] text-white space-y-1">
                        <p>100% Original Product</p>
                        <p>Cash on delivery available</p>
                        <p>Easy return & exchange within 7 days</p>
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className="w-full min-h-[40vh] bg-gradient-to-r from-[#141414] to-[#0c2025] flex flex-col px-[40px] py-[20px] mt-[40px]">
                {/* Tabs */}
                <div className="flex gap-4 ">
                    <p className="border px-5 py-3 text-sm text-white cursor-pointer">Description</p>
                    <p className="border px-5 py-3 text-sm text-white cursor-pointer">Reviews (123)</p>
                </div>

                {/* Tab content */}
                <div className="w-[80%] min-h-[120px] bg-[#3336397c] border text-white text-[15px] lg:text-[18px] px-5 mt-[20px]">
                    <p>
                        Upgrade your style with our latest collection of trendy and fashionable products. From chic clothing to stylish accessories, we have everything you need to elevate your wardrobe and express your unique sense of style. Shop now and discover the perfect pieces to complete your look!
                    </p>
                </div>
                <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
            </div>
        </div>
    ) : (
        <div className="text-white text-center mt-10">Loading...</div>
    )
}

export default ProductDetail
