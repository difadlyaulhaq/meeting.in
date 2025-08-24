'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import MobileNav from './mobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'



const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-black px-6 py-4 lg:10'>
        <Link href='/' className='flex items-center gap-1'>
          <Image
            src='/icons/logo.svg'
            alt='Yoom Logo'
            width={32}
            height={32}
            className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
          Meeting.in
        </p>
      </Link>
      <div className='flex-between gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
      </nav>
  
  )
}

export default Navbar