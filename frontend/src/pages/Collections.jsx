import React, { useEffect } from 'react'
import Tittle from '../component/Tittle'
import { shopDataContext } from '../context/ShopContext.jsx'
import Card from '../component/Card'

function Collections() {

  const { products, search, showSearch } = React.useContext(shopDataContext)

  const [filteredProducts, setFilteredProducts] = React.useState([])
  const [category, setCategory] = React.useState([])
  const [subCategory, setSubCategory] = React.useState([])
  const [sortType, setSortType] = React.useState("relevant")

  // toggle filters
  const toggleCategory = (value) => {
    setCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  const toggleSubCategory = (value) => {
    setSubCategory(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
  }

  // filter logic
  const applyFilters = () => {
    let data = [...products]

    if (showSearch && search) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category.length) {
      data = data.filter(item => category.includes(item.category))
    }

    if (subCategory.length) {
      data = data.filter(item => subCategory.includes(item.subCategory))
    }

    if (sortType === "low-high") {
      data.sort((a, b) => a.price - b.price)
    } else if (sortType === "high-low") {
      data.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(data)
  }

  useEffect(() => {
    applyFilters()
  }, [products, category, subCategory, search, showSearch, sortType])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white px-4 py-10">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* 🔥 FILTER SIDEBAR */}
        <div className="lg:w-[260px] w-full">

          <div className="sticky top-[90px] space-y-6">

            <h2 className="text-2xl font-semibold text-cyan-300">Filters</h2>

            {/* CATEGORY */}
            <div className="bg-[#ffffff08] backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-md">
              <p className="mb-3 text-lg font-medium">Category</p>
              <div className="space-y-2">
                {["Men", "Women", "Kids"].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer text-sm hover:text-cyan-300 transition">
                    <input
                      type="checkbox"
                      onChange={() => toggleCategory(item)}
                      className="accent-cyan-400"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* SUBCATEGORY */}
            <div className="bg-[#ffffff08] backdrop-blur-md p-5 rounded-xl border border-white/10 shadow-md">
              <p className="mb-3 text-lg font-medium">Sub Category</p>
              <div className="space-y-2">
                {["Topwear", "Bottomwear", "WinterWear"].map(item => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer text-sm hover:text-cyan-300 transition">
                    <input
                      type="checkbox"
                      onChange={() => toggleSubCategory(item)}
                      className="accent-cyan-400"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 🔥 MAIN CONTENT */}
        <div className="flex-1">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 mt-5">

            <Tittle text1={"ALL"} text2={"COLLECTIONS"} />

            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-[#0f172a] border border-gray-600 px-4 py-2 rounded-lg text-sm hover:border-cyan-400 transition"
            >
              <option value="relevant">Sort: Relevant</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>

          </div>

          {/* PRODUCT COUNT */}
          <p className="text-gray-400 mb-6 text-sm">
            Showing {filteredProducts.length} products
          </p>

          {/* 🔥 PRODUCTS GRID */}
          {
            filteredProducts.length === 0 ? (
              <div className="text-center text-gray-400 mt-20">
                No products found 😕
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((item, index) => (
                  <Card
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image1}
                  />
                ))}
              </div>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default Collections