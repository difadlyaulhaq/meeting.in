import CallList from '@/components/CallList';
import { Calendar, Clock } from 'lucide-react';

const UpcomingPage = () => {
  return (
    <section className="flex size-full flex-col gap-8 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-white">Upcoming Meetings</h1>
        </div>
        
        <p className="text-gray-400">
          View and manage your scheduled meetings
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Today&apos;s Meetings</h3>
          </div>
          <p className="text-2xl font-bold text-white">0</p>
        </div>
        {/* Add more stat cards as needed */}
      </div>

      {/* Main Content */}
      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Scheduled Meetings</h2>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium">
            New Meeting
          </button>
        </div>
        
        <CallList type="upcoming" />
      </div>
    </section>
  );
};

export default UpcomingPage;