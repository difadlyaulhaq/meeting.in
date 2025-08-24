import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'

const Home = () => {
  const now = new Date(); 
  const time = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const date = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full'
  }).format(now);
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className="h-[300px] w-full rounded-[20px] bg-[url('/images/hero-background.png')] bg-cover bg-center">
        <div className='flex h-full flex-col justify-between max-md:py-8 lg:p-11'> 
          <h2 className='bg-[rgba(255,255,255,0.25)] backdrop-blur-[8px] max-w-[270px] rounded py-2 text-center text-base font-normal'>
            Upcoming Meetings at 12.00 pm
          </h2>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>
              {time}
            </h1>
            <p className='text-lg font-medium'>
              {date}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  )
}

export default Home