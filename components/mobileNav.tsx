'use client'
import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle, // 👈 1. Import SheetTitle
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src='/icons/hamburger.svg'
            alt='menu'
            className='cursor-pointer sm:hidden'
            width={36}
            height={36}
          />
        </SheetTrigger>
        <SheetContent side='left' className='border-none bg-black'>
          <Link href='/' className='flex items-center gap-1 mb-6'>
            <Image
              src='/icons/logo.svg'
              alt='Yoom Logo'
              width={32}
              height={32}
              className='max-sm:size-10'
            />
            <p className='text-[26px] font-extrabold text-white'>
              Meeting.in
            </p>
          </Link>
          
          {/* Add the hidden SheetTitle here for accessibility */}
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

          <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <section className='flex h-full flex-col gap-6 pt-4 text-white'>
              {sidebarLinks.map((link) => {
                const isActive = pathname === link.route || (link.route !== '/' && pathname.startsWith(link.route));
                return (
                  <SheetClose asChild key={link.route}>
                    <Link
                      href={link.route}
                      className={cn(
                        'flex gap-4 items-center p-4 rounded-lg w-full max-w-full transition-colors duration-200',
                        isActive ? 'bg-indigo-600' : 'hover:bg-slate-700'
                      )}
                    >
                      <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={20}
                        height={20}
                      />
                      <p className='font-semibold'>
                        {link.label}
                      </p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav