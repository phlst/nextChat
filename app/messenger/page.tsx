'use client';
import { useState } from 'react';
import Chat from '../_components/messenger/Chat';
import Sidebar from '../_components/messenger/Sidebar';

function Container() {
  const [active, setActive] = useState(1);
  return (
    <div className='grid-row-2 grid h-screen w-screen grid-cols-24 py-8 pr-8 pl-8 md:pl-0'>
      <Sidebar active={active} setActive={setActive} />
      <Chat />
    </div>
  );
}

export default Container;
