'use client'

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';

interface RecordingPlayerProps {
  url: string;
}

const RecordingPlayer = ({ url }: RecordingPlayerProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-zinc-900/50 rounded-xl border border-red-500/20">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h3 className="text-lg font-semibold text-white">Playback Error</h3>
        <p className="text-gray-400 text-center">
          The recording could not be played. This might be due to expired credentials or access rights.
        </p>
        <button 
          onClick={() => setError(false)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg text-white font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <video
      className="w-full rounded-lg"
      controls
      onError={handleError}
    >
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default RecordingPlayer;