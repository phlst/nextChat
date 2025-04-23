import { XMarkIcon } from '@heroicons/react/24/solid';

export default function FriendRequest({ onClick }: { onClick: () => void }) {
  return (
    <div className='fixed z-60 flex h-screen w-screen items-center justify-center bg-transparent'>
      <div className='bg-custom-black h-[70%] w-[50%] rounded-xl border-[1px] border-white/20'>
        <div className='flex items-center justify-between'>
          <h1 className='p-4 text-2xl font-bold text-white'>
            Your Friend Request&apos;s{' '}
          </h1>
          <XMarkIcon
            onClick={onClick}
            color='gray'
            className='m-4 h-12 w-12 transition-all duration-150 hover:scale-120'
          />
        </div>
      </div>
    </div>
  );
}
