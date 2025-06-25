'use client'
import React from 'react'

const Cards = ({artist}) => {
  return (
    <div className="flex justify-center items-center min-h-72 p-2">
      <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 flex flex-col items-center border border-gray-100 max-w-xs w-full">
        <h2 className="text-xl font-bold text-blue-700 mb-1 text-center">{artist.name}</h2>
        <div className="flex flex-wrap gap-2 mb-2 justify-center">
          {artist.categories.map((cat, i) => (
            <span key={i} className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full border border-blue-200">
              {cat}
            </span>
          ))}
        </div>
        <div className="text-gray-600 text-sm mb-1">{artist.location}</div>
        <div className="text-green-600 font-semibold text-lg mb-4">₹ {artist.feeRange}</div>
        <button className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-colors">Ask for Quote</button>
      </div>
    </div>
  )
}

export default Cards
