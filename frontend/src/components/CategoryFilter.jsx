import React from 'react'

const categories = ['All', 'Popular', 'Italian', 'Chinese', 'Indian', 'Japanese', 'Fast Food'];
function CategoryFilter({ setSelectedCategory, selectedCategory}) {
  return (
    <div>
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#FFB800] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryFilter