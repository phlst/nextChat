'use client';
import { getSessionUser, getUserById } from '@/app/lib/appwrite';
import { setUser } from '@/app/lib/user';
import { Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import Chat from './Chat';

export default function MessengerContainer() {
  const [active, setActive] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSessionUser();
        const userData = await getUserById(data.$id);

        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error fetching session user:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className='grid h-screen w-screen grid-cols-24 py-8 pr-8 pl-8 md:pl-0'>
      <Sidebar active={active} setActive={setActive} />
      <Suspense fallback="loading....">

        <Chat />
      </Suspense>
    </div>
  );
}
