'use client'
import React, { useState } from 'react'
import Navbar from '../components/navbar'
import Cards from '../components/cards'
import artistData from '../../data/artistData.json'

// Extract unique categories and fee ranges from artistData
const allCategories = ['Singer', 'Dancer', 'DJ', 'Speaker']
const allFeeRanges = ['5000-10,000', '10,000-15,000', '15,000-20,000', '20,000-30,000', '30,000+']

const page = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedFeeRange, setSelectedFeeRange] = useState('')
  const [location, setLocation] = useState('')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  // Filtering logic
  const filteredArtists = artistData.filter(artist => {
    // Location filter (case-insensitive substring match)
    const matchesLocation = location === '' || artist.location.toLowerCase().includes(location.toLowerCase())
    // Categories filter (at least one selected category matches artist's categories)
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.some(cat => artist.categories.includes(cat))
    // Fee range filter (exact match)
    const matchesFeeRange = selectedFeeRange === '' || artist.feeRange === selectedFeeRange
    return matchesLocation && matchesCategories && matchesFeeRange
  })

  // Handle category selection (multiselect)
  const handleCategoryChange = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  return (
    <div>
      <Navbar />
      {/* Filter UI */}
      <div className="flex flex-wrap gap-4 p-6 items-end">
        {/* Location input */}
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter location"
            className="border rounded px-3 py-2 w-48"
          />
        </div>
        {/* Categories multiselect dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Categories</label>
          <button
            type="button"
            className="border rounded px-3 py-2 w-48 text-left bg-white"
            onClick={() => setShowCategoryDropdown(v => !v)}
          >
            {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'Select categories'}
          </button>
          {showCategoryDropdown && (
            <div className="absolute z-10 bg-white border rounded shadow w-48 mt-1 max-h-48 overflow-y-auto">
              {allCategories.map(cat => (
                <label key={cat} className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
            </div>
          )}
        </div>
        {/* Fee range single-select dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">Fee Range</label>
          <select
            value={selectedFeeRange}
            onChange={e => setSelectedFeeRange(e.target.value)}
            className="border rounded px-3 py-2 w-48 bg-white"
          >
            <option value="">All</option>
            {allFeeRanges.map(fee => (
              <option key={fee} value={fee}>{fee}</option>
            ))}
          </select>
        </div>
      </div>
      {/* Artist grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0 p-6">
        {filteredArtists.map((artist, idx) => (
          <Cards key={idx} artist={artist} />
        ))}
      </div>
    </div>
  )
}

export default page
