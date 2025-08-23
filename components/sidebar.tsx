'use client'

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-slate-900 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(link.route);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start transition-colors duration-200 hover:bg-slate-700', {
                'bg-indigo-700 hover:bg-indigo-600': isActive
              })}
            >
              {/* Anda bisa menambahkan icon di sini jika ada */}
              <p className="font-semibold">
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