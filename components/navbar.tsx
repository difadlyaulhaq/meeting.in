'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import MobileNav from './mobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    // 1. Pastikan nav utama memiliki 'flex', 'justify-between', dan 'items-center'
    <nav className='flex items-center justify-between fixed z-50 w-full bg-black px-6 py-4 lg:px-10'>
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
      
      {/* 2. Grup ikon juga menggunakan 'flex' dan 'items-center' agar rapi berdampingan */}
      <div className='flex items-center gap-5'>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
      </nav>
  
  )
}

export default Navbar