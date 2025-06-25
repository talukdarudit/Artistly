'use client'
import React from 'react'
import Link from 'next/link'
import Navbar from './components/navbar'

const categories = [
  { name: 'Singers', emoji: '🎤' },
  { name: 'Dancers', emoji: '💃' },
  { name: 'Speakers', emoji: '🎙️' },
  { name: 'DJs', emoji: '🎧' },
];

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dummy Header */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">Discover & Book Top Artists</h1>
        <p className="text-lg text-gray-600 mb-8">Artistly connects you with the best Singers, Dancers, DJs, and Speakers for your next event. Explore, connect, and create memorable experiences!</p>
        <Link href="/listing">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow hover:bg-blue-700 transition">Explore Artists</button>
        </Link>
      </section>

      {/* Category Cards */}
      <section className="max-w-5xl mx-auto py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link href="" key={cat.name} className="block">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition">
              <div className="w-16 h-16 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                <span className="text-3xl">{cat.emoji}</span>
              </div>
              <div className="text-xl font-semibold text-gray-800">{cat.name}</div>
            </div>
          </Link>
        ))}
      </section>

      {/* Overview Section */}
      <section className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Why Choose Artistly?</h2>
        <p className="text-gray-600 mb-2">• Curated list of top artists across categories</p>
        <p className="text-gray-600 mb-2">• Easy booking and transparent pricing</p>
        <p className="text-gray-600 mb-2">• Connect directly with artists for your events</p>
        <p className="text-gray-600">• Trusted by event organizers nationwide</p>
      </section>
    </div>
  )
}

export default Homepage