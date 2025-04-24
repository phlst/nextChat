import { XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { acceptRequest, removeRequest, requestData } from '@/app/lib/appwrite';

export default function FriendRequest({ onClick, requests }: { onClick: () => void, requests: FriendRequest[] | undefined }) {
  const [friendRequests, setFriendRequest] = useState<RequestFriendData[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      if (requests === undefined) {
        setIsLoading(false)
        return
      }

      console.log(requests)
      const data = await requestData(requests.map(request => request.sender_id), requests.map(request => request.$id))
      setFriendRequest(data)
      console.log(data)
      setIsLoading(false)
    }
    getData();
  }, [requests])

  async function handleRejection(value: string) {
    setIsLoading(true)
    try {
      await removeRequest(value)
      setIsLoading(false)
    } catch (error) { console.log(error); setIsLoading(false) }
  }

  async function handleAccept(value: string) {

    setIsLoading(true)
    try {
      await acceptRequest(value)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  return (
    <div className='fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn'>
      <div className='p-6 bg-custom-black w-full max-w-md md:max-w-lg rounded-xl border border-white/20 shadow-xl transform animate-scaleIn'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-bold text-white'>
            Friend Requests
          </h1>
          <button
            onClick={onClick}
            className='p-1 rounded-full hover:bg-white/10 transition-all duration-200'
            aria-label="Close"
          >
            <XMarkIcon color='white' className='h-7 w-7' />
          </button>
        </div>

        <div className='max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar'>
          {isLoading ? (
            <div className='flex justify-center py-8'>
              <div className='animate-pulse flex space-x-4'>
                <div className='rounded-full bg-white/10 h-12 w-12'></div>
                <div className='flex-1 space-y-3 py-1'>
                  <div className='h-4 bg-white/10 rounded'></div>
                  <div className='space-y-2'>
                    <div className='h-8 bg-white/10 rounded'></div>
                  </div>
                </div>
              </div>
            </div>
          ) : friendRequests && friendRequests.length > 0 ? (
            <div className='space-y-4'>
              {friendRequests.map((request, i) => (
                <div key={i} className='bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-200'>
                  <div className='flex items-center gap-4 mb-3'>
                    <div className='relative h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-xl font-bold'>
                      {request.avatar_url ? (
                        <Image
                          src={request.avatar_url}
                          alt={request.name}
                          width={48}
                          height={48}
                          className='rounded-full object-cover'
                        />
                      ) : (
                        <span>{request.name?.charAt(0)?.toUpperCase()}</span>
                      )}
                      <div className='absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-custom-black'></div>
                    </div>
                    <div>
                      <p className='text-lg font-semibold text-white'>{request.name}</p>
                      <p className='text-sm text-gray-400'>wants to be your friend</p>
                    </div>
                  </div>

                  <div className='flex gap-3 justify-end'>
                    <button onClick={() => handleRejection(request.requestId)} className='px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 text-sm font-medium'>
                      Decline
                    </button>
                    <button onClick={() => handleAccept(request.requestId)} className='px-4 py-2 bg-gradient-to-r from-custom-green to-neon hover:from-custom-neon hover:to-custom-green text-white rounded-lg transition-all duration-200 text-sm font-medium'>
                      Accept
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-10'>
              <div className='mx-auto w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <p className='text-gray-400'>No friend requests at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
