import CallList from "@/components/CallList";
import { History, Calendar, Clock } from "lucide-react";

const PreviousPage = () => {
  return (
    <section className="flex size-full flex-col gap-8 p-6">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <History className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-white">Previous Calls</h1>
        </div>
        <p className="text-gray-400">
          View your meeting history and recordings
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Total Meetings</h3>
          </div>
          <p className="text-2xl font-bold text-white">0</p>
        </div>
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Total Duration</h3>
          </div>
          <p className="text-2xl font-bold text-white">0h</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Meeting History</h2>
          <select className="bg-zinc-800 text-white px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:border-blue-500">
            <option value="all">All Meetings</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        
        <CallList type="ended" />
      </div>
    </section>
  );
};

export default PreviousPage;