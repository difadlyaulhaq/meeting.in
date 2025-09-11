import { useEffect, useState } from 'react';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !id) return;

    const loadCall = async () => {
      setIsCallLoading(true);
      try {
        // Query calls dengan filter berdasarkan ID
        const { calls } = await client.queryCalls({
          filter_conditions: { id: id as string },
        });

        if (calls.length > 0) {
          setCall(calls[0]);
        }
      } catch (error) {
        console.error('Error fetching call:', error);
      } finally {
        setIsCallLoading(false);
      } 
    };// Akhir fungsi loadCall

    loadCall();
  }, [client, id]); // Dependency array yang benar untuk mencegah loop

  return { call, isCallLoading };
};