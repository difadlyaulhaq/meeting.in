'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-zinc-900/95 backdrop-blur-md border-r border-zinc-800/50 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(link.route);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                'flex gap-4 items-center p-4 rounded-lg justify-start transition-all duration-200',
                isActive 
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md shadow-blue-500/20' 
                  : 'hover:bg-zinc-800/80 hover:shadow-sm'
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
                className={cn('transition-transform', {
                  'scale-110': isActive
                })}
              />
              <p className={cn('text-lg font-semibold max-lg:hidden transition-colors', {
                'text-white': isActive,
                'text-zinc-400 group-hover:text-white': !isActive
              })}>
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  )
}

export default Sidebar