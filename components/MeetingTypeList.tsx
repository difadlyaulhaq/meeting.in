/* eslint-disable camelcase */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import ReactDatePicker from 'react-datepicker';
import { toast } from 'sonner';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import Loader from './Loader';
import { Textarea } from './ui/textarea';
import { Toaster } from "@/components/ui/sonner";
import { Input } from './ui/input';

// Import CSS untuk react-datepicker jika belum diimport di file lain
import 'react-datepicker/dist/react-datepicker.css';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast.error('Please select a date and time');
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast.success('Meeting Created');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create Meeting');
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  return (
    <>
      {/* Toaster dipindahkan ke luar section untuk positioning yang lebih baik */}
      <Toaster position="top-right" richColors closeButton />
      
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 p-4 w-full max-w-7xl mx-auto">
        <HomeCard
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start an instant meeting"
          handleClick={() => setMeetingState('isInstantMeeting')}
          className="bg-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105"
        />
        <HomeCard
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          className="bg-indigo-500 hover:bg-blue-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          handleClick={() => setMeetingState('isJoiningMeeting')}
        />
        <HomeCard
          img="/icons/schedule.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
          className="bg-purple-500 hover:bg-purple-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <HomeCard
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Meeting Recordings"
          className="bg-amber-500 hover:bg-yellow-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          handleClick={() => router.push('/recordings')}
        />

        {/* Modal untuk Schedule Meeting */}
        {!callDetail ? (
          <MeetingModal
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-medium leading-[22.4px] text-sky-2">
                  Add a description
                </label>
                <Textarea
                  className="min-h-[100px] border-none bg-dark-3 text-white placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none rounded-lg"
                  placeholder="What's this meeting about?"
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-col gap-2.5">
                <label className="text-base font-medium leading-[22.4px] text-sky-2">
                  Select Date and Time
                </label>
                <div className="relative">
                  <ReactDatePicker
                    selected={values.dateTime}
                    onChange={(date) => setValues({ ...values, dateTime: date! })}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="w-full rounded-lg bg-dark-3 p-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    calendarClassName="bg-dark-2 border-gray-600"
                    minDate={new Date()}
                  />
                </div>
              </div>
            </div>
          </MeetingModal>
        ) : (
          <MeetingModal
            isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast.success('Link Copied');
            }}
            image={'/icons/checked.svg'}
            buttonIcon="/icons/copy.svg"
            className="text-center max-w-md mx-auto"
            buttonText="Copy Meeting Link"
          >
            <div className="flex flex-col gap-4 items-center">
              <div className="bg-dark-3 p-4 rounded-lg w-full">
                <p className="text-sm text-gray-300 mb-2">Meeting Link:</p>
                <p className="text-blue-400 break-all text-sm font-mono bg-dark-4 p-2 rounded">
                  {meetingLink}
                </p>
              </div>
            </div>
          </MeetingModal>
        )}

        {/* Modal untuk Join Meeting */}
        <MeetingModal
          isOpen={meetingState === 'isJoiningMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Type the link here"
          className="text-center max-w-md mx-auto"
          buttonText="Join Meeting"
          handleClick={() => router.push(values.link)}
        >
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Meeting link"
              onChange={(e) => setValues({ ...values, link: e.target.value })}
              className="border-none bg-black text-white placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 p-3 rounded-lg"
            />
            {values.link && (
              <div className="text-sm text-gray-400">
                Ready to join: <span className="text-blue-400">{values.link}</span>
              </div>
            )}
          </div>
        </MeetingModal>

        {/* Modal untuk Instant Meeting */}
        <MeetingModal
          isOpen={meetingState === 'isInstantMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Start an Instant Meeting"
          className="text-center max-w-md mx-auto"
          buttonText="Start Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-4 items-center">
            <div className="bg-black p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                You're about to start an instant meeting. Anyone with the link will be able to join.
              </p>
            </div>
          </div>
        </MeetingModal>
      </section>
    </>
  );
};

export default MeetingTypeList;