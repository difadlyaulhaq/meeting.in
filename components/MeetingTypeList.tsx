'use client'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
// Hapus baris 'import { link } from 'fs'' yang menyebabkan error

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] =
    useState<'isScheduleMeeting'| 'isJoiningMeeting'|
    'isInstantMeeting'|undefined>()
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
      dateTime: new Date(),
      description:'',
      link:''
    });

    const [callDetails, setCallDetails] = useState<Call>()

    const createMeeting = async () => {
      if (!client || !user) return;
      
      try {
        const id = crypto.randomUUID();
        const call = client.call('default', id);

        if(!call) throw new Error('Failed to create call');

        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
        const description = values.description || 'Instant Meeting';

        await call.getOrCreate({
            data: {
              starts_at: startsAt,
              custom: {
                description,
              },
            },
        });

        setCallDetails(call);

        // Redirect hanya jika ini adalah instant meeting (tidak ada deskripsi yang di-set sebelumnya)
        if(!values.description){
          router.push(`/meeting/${call.id}` );
        }
      } catch (error) {
        console.error("Failed to create meeting:", error);
      }
    }  

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4' >
      <HomeCard
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start an instant meeting"
          className="bg-orange-500"
          handleClick={() => setMeetingState('isInstantMeeting')}
        />
        <HomeCard
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          className="bg-indigo-500"
          handleClick={() => setMeetingState('isJoiningMeeting')}
        />
        <HomeCard
          img="/icons/schedule.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
          className="bg-purple-500"
          handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <HomeCard
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Meeting Recordings"
          className="bg-amber-500"
          handleClick={() => router.push('/recordings')}
        />

      {/* Modal untuk Instant Meeting */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  )
}

export default MeetingTypeList