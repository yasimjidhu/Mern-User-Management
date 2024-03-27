import React from 'react'
import Header from '../components/common/Header'

const HomePage = () => {
  return (
    <>
    <Header/>
    <div className='w-full h-[100vh] bg-rose-600 flex justify-center items-center'>
      <h1 className='text-white text-5xl font-extrabold'>home page</h1>
    </div>
    </>
  )
}

export default HomePage
