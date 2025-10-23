"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Copy, Video, User, Link as LinkIcon, Calendar } from "lucide-react";

import { useGetCallById } from '@/hooks/useGetCallById';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const InfoCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-dark-2 border border-dark-3 hover:border-blue-500/50 transition-all">
      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <p className="text-base font-semibold text-white break-all">
          {description}
        </p>
      </div>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    try {
      const newCall = client.call("default", meetingId!);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }

      router.push(`/meeting/${meetingId}?personal=true`);
    } catch (error) {
      console.error(error);
      toast.error('Failed to start meeting');
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL || window.location.origin}/meeting/${meetingId}?personal=true`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    toast.success('Meeting link copied to clipboard!');
  };

  return (
    <section className="flex size-full flex-col gap-8 text-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Video className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Personal Meeting Room</h1>
          <p className="text-gray-400 mt-1">Your dedicated space for instant meetings</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard
          icon={User}
          title="Host"
          description={user?.username || user?.firstName || 'User'}
        />
        
        <InfoCard
          icon={Calendar}
          title="Meeting ID"
          description={meetingId || 'Loading...'}
        />
        
        <div className="md:col-span-2 xl:col-span-1">
          <InfoCard
            icon={LinkIcon}
            title="Room Status"
            description="Always Available"
          />
        </div>
      </div>

      {/* Invite Link Card */}
      <div className="p-6 rounded-xl bg-dark-2 border border-dark-3">
        <div className="flex items-center gap-2 mb-4">
          <LinkIcon className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold">Invitation Link</h2>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex-1 p-3 bg-dark-4 rounded-lg border border-dark-3">
            <p className="text-sm text-gray-300 break-all font-mono">
              {meetingLink}
            </p>
          </div>
          <Button
            onClick={copyToClipboard}
            className="bg-dark-3 hover:bg-dark-4 border border-dark-3 hover:border-blue-500/50 transition-all"
            size="icon"
          >
            <Copy className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={startRoom}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg transition-all transform hover:scale-105"
        >
          <Video className="w-5 h-5 mr-2" />
          Start Meeting
        </Button>
        
        <Button
          onClick={copyToClipboard}
          className="bg-dark-3 hover:bg-dark-2 border border-dark-3 hover:border-blue-500/50 font-semibold px-8 py-6 text-lg transition-all"
        >
          <Copy className="w-5 h-5 mr-2" />
          Copy Invitation
        </Button>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <p className="text-sm text-gray-300">
          💡 <strong>Tip:</strong> Share this link with others to invite them to your personal room. 
          This room is always available and uses your user ID as the meeting ID.
        </p>
      </div>
    </section>
  );
};

export default PersonalRoom;