import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import RelatedProduct from '../component/RelatedProduct'

function ProductDetail() {
    const { productId } = useParams()

    const { products, currency, addToCart } = useContext(shopDataContext)
    const { serverUrl } = useContext(authDataContext)

    const [productData, setProductData] = useState(null)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')

    // ✅ Fetch product safely
    useEffect(() => {
        if (products.length === 0) return

        const found = products.find(
            item => String(item._id) === String(productId)
        )

        if (found) {
            setProductData(found)
            setImage(found.image1)
        }

    }, [productId, products])

    // ✅ Loading state
    if (!productData) {
        return (
            <div className="text-white text-center mt-20 text-xl">
                Loading product...
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-r from-[#141414] to-[#0c2025] py-10">

            <div className="lg:w-[80vw] md:w-[95vw] flex flex-col lg:flex-row gap-8">

                {/* LEFT: thumbnails */}
                <div className="flex lg:flex-col gap-3">
                    {[productData.image1, productData.image2, productData.image3, productData.image4].map((img, idx) => (
                        <img
                            key={idx}
                            src={`${serverUrl}/${img?.replace('public/', '')}`}
                            className="w-[80px] h-[100px] object-cover cursor-pointer rounded-md border"
                            onClick={() => setImage(img)}
                        />
                    ))}
                </div>

                {/* CENTER: main image */}
                <div className="lg:w-[40%] w-full bg-black rounded-md flex items-center justify-center">
                    <img
                        src={`${serverUrl}/${image?.replace('public/', '')}`}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* RIGHT: info */}
                <div className="lg:w-[40%] w-full text-white flex flex-col gap-5">

                    <h1 className="text-3xl font-semibold">
                        {productData.name}
                    </h1>

                    {/* rating */}
                    <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStarHalfAlt className="text-yellow-400" />
                        <span>(123)</span>
                    </div>

                    <p className="text-2xl font-bold">
                        {currency} {productData.price}
                    </p>

                    <p>{productData.description}</p>

                    {/* size */}
                    <div>
                        <p className="mb-2 font-semibold">Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSize(item)}
                                    className={`px-4 py-2 border rounded 
                                    ${size === item ? "bg-white text-black" : ""}`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(productData._id, size)}
                        className="bg-blue-600 px-6 py-3 rounded mt-4"
                    >
                        Add to Cart
                    </button>

                </div>
            </div>

            {/* Related */}
            <div className="w-full mt-10">
                <RelatedProduct
                    category={productData.category}
                    subCategory={productData.subCategory}
                    currentProductId={productData._id}
                />
            </div>
        </div>
    )
}

export default ProductDetail
