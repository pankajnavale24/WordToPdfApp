import React from 'react'

export default function Navbar() {
  return (
    <>
    <div className='max-w-screen-2xl mx-auto container px-8 md:px-40 shadow-lg h-16 py-3 fixed'>
        <div className='flex justify-between '>
            <h1 className='text-2xl cursor-pointer font-extrabold'>Word<span className='text-green-500 text-3xl'>TO</span>Pdf</h1>
            <h1 className='text-2xl cursor-pointer font-extrabold mt-1 hover:scale-125 duration-200'>Home</h1>
        </div>
    </div>
    </>
  )
}
