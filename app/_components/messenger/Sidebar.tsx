'use client';
import { getRequest, findUsers, getMyFriends } from '@/app/lib/appwrite';
import { RootState } from '@/app/lib/store';
import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  BellIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FriendRequest from './FriendRequest';

function Sidebar({
  active,
  setActive,
}: {
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [myFriends, setMyFriends] = useState<Friend[]>();
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>();
  const [isOpen, setIsOpen] = useState(false);

  const avatar = useSelector((state: RootState) => state.user.avatar_url);
  const myId = useSelector((state: RootState) => state.user.$id);
  const friends = useSelector((state: RootState) => state.user.friends);

  useEffect(() => {
    async function getFriendRequest() {
      const request = await getRequest(myId);
      setFriendRequests(request);
    }
    getFriendRequest();
  }, [myId]);
  async function searchUsers(value: string) {
    if (value === '') {
      async function fetchFriends() {
        const data = await getMyFriends(friends);
        setMyFriends(data);
      }

      fetchFriends();
    } else {
      const data = await findUsers(value);
      setMyFriends(data);
    }
  }

  function handleFriendClick(index: string) {
    const params = new URLSearchParams();
    setActive(index);
    if (!friends.includes(index)) {
      params.set('add', index.toString());
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.set('chat', index.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  }
  useEffect(() => {
    async function fetchFriends() {
      const data = await getMyFriends(friends);
      setMyFriends(data);
    }

    fetchFriends();
  }, [friends]);
  return (
    <>
      {isOpen ? (
        <FriendRequest requests={friendRequests} onClick={() => setIsOpen((state) => !state)} />
      ) : null}
      <div className='col-start-1 col-end-2 hidden flex-col items-center justify-between md:flex'>
        <div>
          <span className='flex h-9 w-9 items-center justify-center transition-all hover:scale-120'>
            <ChatBubbleOvalLeftIcon className='fill-custom-green h-8 w-8' />
          </span>

          <span className='flex h-9 w-9 items-center justify-center pt-5 transition-all hover:scale-120'>
            <BuildingStorefrontIcon className='fill-custom-green h-8 w-8' />
          </span>
        </div>
        <div>
          {friendRequests?.length !== 0 ? (
            <span
              onClick={() => setIsOpen((state) => !state)}
              className='mb-2 flex h-9 w-9 animate-bounce items-center justify-center transition-all hover:scale-120'
            >
              <BellIcon className='fill-custom-green h-8 w-8' />
            </span>
          ) : null}
          <div className='relative mb-4 inline-block h-9 w-9 transition-all duration-150 hover:scale-120'>
            <Image
              src={
                avatar ||
                'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin'
              }
              sizes='cover'
              alt="user's avatar"
              fill={true}
              className='relative rounded-lg'
            />
          </div>
          <span className='flex h-9 w-9 items-center justify-center transition-all hover:scale-120'>
            <Cog6ToothIcon className='fill-custom-green h-8 w-8' />
          </span>
        </div>
      </div>

      <div className='bg-custom-gray col-start-1 col-end-25 overflow-hidden rounded-xl border-1 md:col-start-2 md:col-end-9 md:mr-8 lg:col-end-8'>
        <div className='scrollbar scrollbar-thumb-custom-black scrollbar-track-custom-gray h-full max-h-full w-full overflow-y-scroll p-4 text-white'>
          <h1 className='text-3xl'>Chat&apos;s</h1>
          <input
            placeholder='Find your friend'
            className='bg-custom-black mt-2 w-full rounded-xl p-2 outline-none'
            onChange={(e) => searchUsers(e.target.value)}
          />
          {myFriends?.length !== 0 && myFriends
            ? myFriends.map((friend) => (
              <div
                key={friend.$id + friend.name}
                className={`relative my-4 ${active === friend.$id ? 'bg-amber-50/10' : ''
                  } flex items-center rounded-2xl hover:bg-amber-50/10`}
                onClick={() => handleFriendClick(friend.$id)}
              >
                <Image
                  src={friend.avatar_url}
                  alt={`Image of ${friend.name}`}
                  width={40}
                  height={40}
                  className='m-2 inline rounded-full'
                />
                <div className='flex flex-col justify-center'>
                  <span className='font-bold'>{friend.name}</span>
                </div>
              </div>
            ))
            : null}
        </div>
      </div>
    </>
  );
}
export default Sidebar;
