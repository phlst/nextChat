import { findChat, getMessagesChat } from '@/app/lib/appwrite';
import { RootState } from '@/app/lib/store';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function ChatMessages() {
  const searchParams = useSearchParams();
  const myId = useSelector((state: RootState) => state.user.$id);
  const chatId = searchParams.get('chat');
  const [chatMessages, setChatMessages] = useState<Message[]>();
  useEffect(() => {
    async function getChatData() {
      if (chatId === null) {
        return false;
      } else {
        const chat = await findChat(chatId);
        const messages = await getMessagesChat(chat.messages);
        setChatMessages(messages);
      }
    }
    getChatData();
  }, [chatId]);

  return (
    <>
      <div className='text-custom-green fixed z-20 rounded-2xl bg-zinc-900 p-2 font-bold'>
        Chat with Jozko Pobehly
      </div>
      <div className='flex h-full w-full flex-col-reverse'>
        <input
          className='bg-custom-black mt-5 w-full rounded-2xl p-2 text-white'
          placeholder='Aa'
          type='text'
        />
        <div className='scrollbar scrollbar-thumb-custom-black scrollbar-track-custom-gray flex h-full w-full flex-col-reverse overflow-y-scroll'>
          {chatMessages !== undefined
            ? chatMessages.map((message, i) => {
                const prevSender = chatMessages[i - 1]?.senderId;
                const nextSender = chatMessages[i + 1]?.senderId;
                const isMine = message.senderId === myId;

                const baseClasses = `
    ${isMine ? 'bg-custom-green self-end rounded-tl-2xl rounded-bl-2xl' : 'bg-zinc-700/20 self-start rounded-tr-2xl rounded-br-2xl'}
    p-2 text-white
    
  `;

                let topRadius = '';
                let bottomRadius = '';
                let middle = '';

                if (isMine) {
                  topRadius =
                    prevSender !== message.senderId ? 'rounded-br-2xl' : '';
                  bottomRadius =
                    nextSender !== message.senderId ? 'rounded-tr-2xl' : '';
                  middle =
                    prevSender === message.senderId &&
                    nextSender === message.senderId
                      ? 'rounded-r-sm'
                      : '';
                } else {
                  topRadius =
                    prevSender !== message.senderId ? 'rounded-bl-2xl' : '';
                  bottomRadius =
                    nextSender !== message.senderId ? 'rounded-tl-2xl' : '';
                  middle =
                    prevSender === message.senderId &&
                    nextSender === message.senderId
                      ? 'rounded-l-sm'
                      : null;
                }

                return (
                  <div
                    key={i + message.message}
                    className={`${baseClasses} ${topRadius} ${bottomRadius} ${middle} m-[1px]`}
                  >
                    {message.message}
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
