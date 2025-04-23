'use client';
import { useSearchParams } from 'next/navigation';
import { ChatMessages } from './ChatMessages';
import AddFriend from './AddFriend';

function Chat() {
  const searchParams = useSearchParams();
  const searchChat = searchParams.get('chat');
  const searchAdd = searchParams.get('add');
  const isFull = searchChat !== '' || searchAdd !== '';
  return (
    <div
      className={`bg-custom-gray z-50 hidden overflow-hidden rounded-xl p-5 md:col-start-9 md:col-end-25 md:block lg:col-start-8 ${isFull ? 'col-start-0 col-end-25 block' : ''} `}
    >
      {searchAdd !== null ? (
        <AddFriend add={searchAdd} />
      ) : searchChat !== null ? (
        <ChatMessages />
      ) : (
        <h1>Start chat with someone</h1>
      )}
    </div>
  );
}

export default Chat;
