'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import MobileNav from './mobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between fixed z-50 w-full backdrop-blur-md bg-zinc-900/80 border-b border-zinc-800/50 px-6 py-4 lg:px-10 shadow-lg'>
      <Link href='/' className='flex items-center gap-3 group'>
        <div className='relative overflow-hidden rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 p-2 transition-transform group-hover:scale-110 shadow-md'>
          <Image
            src='/icons/logo.svg'
            alt='Yoom Logo'
            width={24}
            height={24}
            className='max-sm:size-8'
          />
        </div>
        <p className='text-[26px] font-extrabold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent max-sm:hidden group-hover:to-indigo-500 transition-all'>
          Meeting.in
        </p>
      </Link>
      
      <div className='flex items-center gap-6'>
        <SignedIn>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
                userButtonPopulator: "hover:opacity-70 transition-opacity",
                userButtonTrigger: "ring-2 ring-blue-500/20 hover:ring-blue-500/50 transition-all"
              }
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar