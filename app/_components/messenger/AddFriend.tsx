'use client';
import { getUserById, sendFriendRequest } from '@/app/lib/appwrite';
import { RootState } from '@/app/lib/store';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddFriend({ add }: { add: string }) {
  const [user, setUser] = useState<Friend>();
  const myId = useSelector((state: RootState) => state.user.$id);

  const [result, setResult] = useState<boolean | undefined>();
  useEffect(() => {
    async function findUser() {
      const user = await getUserById(add);
      setUser(user);
    }
    findUser();
  }, [add]);

  async function handleAddfriend(id: string) {
    const result = await sendFriendRequest({ sender: myId, receiver: id });
    setResult(result);
  }

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-5'>
      <Suspense fallback='loading...'>
        {user ? (
          <>
            <div className='relative h-64 w-64'>
              <Image
                src={user.avatar_url}
                alt='Image of friend'
                fill
                priority
                sizes='cover'
                className='rounded-full'
              />
            </div>
            <p className='text-3xl font-bold text-white'>
              Start a chat with {user.name}
            </p>

            {/* Result indicator */}
            {result !== undefined && (
              <div className='animate-fadeIn mt-4 mb-2 flex items-center justify-center'>
                {result ? (
                  <div className='flex flex-col items-center'>
                    <div className='text-8xl text-green-500'>✓</div>
                    <p className='mt-2 font-semibold text-green-400'>
                      Friend request sent successfully!
                    </p>
                  </div>
                ) : (
                  <div className='flex flex-col items-center'>
                    <div className='text-8xl text-red-500'>✗</div>
                    <p className='mt-2 font-semibold text-red-400'>
                      Failed to send friend request
                    </p>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => {
                handleAddfriend(user.$id);
              }}
              className='bg-neon rounded-lg px-2 py-1 text-2xl font-bold text-black transition-all duration-150 hover:scale-120'
              disabled={result === true}
            >
              {result === true ? 'Friend Request Sent' : 'Add Friend'}
            </button>
          </>
        ) : null}
      </Suspense>
    </div>
  );
}
