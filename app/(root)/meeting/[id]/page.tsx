'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';

import { useGetCallById } from '@/hooks/useGetCallById';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';

const MeetingPage = () => {
  const params = useParams();
  const { isLoaded } = useUser();
  
  // Type guard untuk memastikan id adalah string
  const id = params.id;
  const meetingId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  
  const { call, isCallLoading } = useGetCallById(meetingId);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Handle case ketika id tidak valid
  if (!meetingId) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Invalid Meeting ID
      </p>
    );
  }

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) return (
    <p className="text-center text-3xl font-bold text-white">
      Call Not Found
    </p>
  );

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingPage;