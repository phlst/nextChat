const myId = 8765432;

const fakeChat = {
  friendId: [9876543, 8765432],
  messages: [
    {
      sender: 9876543,
      message: 'Hey, how are you doing today?',
      timeSend: 1712950793, // 2024-04-13 16:33:13 UTC
    },
    {
      sender: 8765432,
      message: "I'm good! Just finished that project we talked about.",
      timeSend: 1712950893, // 2024-04-13 16:34:53 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me the details?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 9876543,
      message: 'Hey, how are you doing today?',
      timeSend: 1712950793, // 2024-04-13 16:33:13 UTC
    },
    {
      sender: 8765432,
      message: "I'm good! Just finished that project we talked about.",
      timeSend: 1712950893, // 2024-04-13 16:34:53 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me the details?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email .",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 9876543,
      message: 'Hey, how are you doing today?',
      timeSend: 1712950793, // 2024-04-13 16:33:13 UTC
    },
    {
      sender: 8765432,
      message: "I'm good! Just finished that project we talked about.",
      timeSend: 1712950893, // 2024-04-13 16:34:53 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me the details?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 9876543,
      message: 'Hey, how are you doing today?',
      timeSend: 1712950793, // 2024-04-13 16:33:13 UTC
    },
    {
      sender: 8765432,
      message: "I'm good! Just finished that project we talked about.",
      timeSend: 1712950893, // 2024-04-13 16:34:53 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me the details?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 9876543,
      message: 'Hey, how are you doing today?',
      timeSend: 1712950793, // 2024-04-13 16:33:13 UTC
    },
    {
      sender: 8765432,
      message: "I'm good! Just finished that project we talked about.",
      timeSend: 1712950893, // 2024-04-13 16:34:53 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me the details?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me the details?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me the details?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 9876543,
      message: "That's great! Can you send me th?",
      timeSend: 1712951023, // 2024-04-13 16:37:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
    {
      sender: 8765432,
      message: "Sure, I'll email you the documentation later today.",
      timeSend: 1712951143, // 2024-04-13 16:39:03 UTC
    },
  ],
};
function Chat() {
  return (
    <div className='bg-custom-gray col-start-9 col-end-25 hidden overflow-hidden rounded-xl p-5 md:block lg:col-start-8'>
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
          {fakeChat.messages.map((message, i) => {
            const prevSender = fakeChat.messages[i - 1]?.sender;
            const nextSender = fakeChat.messages[i + 1]?.sender;
            const isMine = message.sender === myId;

            const baseClasses = `
    ${isMine ? 'bg-custom-green self-end rounded-tl-2xl rounded-bl-2xl' : 'bg-zinc-700/20 self-start rounded-tr-2xl rounded-br-2xl'}
    p-2 text-white
    
  `;

            let topRadius = '';
            let bottomRadius = '';
            let middle = '';

            if (isMine) {
              topRadius = prevSender !== message.sender ? 'rounded-br-2xl' : '';
              bottomRadius =
                nextSender !== message.sender ? 'rounded-tr-2xl' : '';
              middle =
                prevSender === message.sender && nextSender === message.sender
                  ? 'rounded-r-sm'
                  : '';
            } else {
              topRadius = prevSender !== message.sender ? 'rounded-bl-2xl' : '';
              bottomRadius =
                nextSender !== message.sender ? 'rounded-tl-2xl' : '';
              middle =
                prevSender === message.sender && nextSender === message.sender
                  ? 'rounded-l-sm'
                  : '';
            }

            return (
              <div
                key={i + message.message}
                className={`${baseClasses} ${topRadius} ${bottomRadius} ${middle} m-[1px]`}
              >
                {message.message}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Chat;
