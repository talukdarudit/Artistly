'use client'
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <header className="w-full bg-white shadow p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-700">Artistly</div>
        <nav className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/listing">Explore Artists</Link>
          <Link href="">Dashboard</Link>
          <Link href="/onboarding">Onboard</Link>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
