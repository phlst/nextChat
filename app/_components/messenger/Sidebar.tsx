import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const fakeData = [
  {
    index: 1,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 2,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 3,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 4,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 5,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 6,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 7,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 8,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 9,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 10,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 11,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 12,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 13,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    index: 14,
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
];

function Sidebar({
  active,
  setActive,
}: {
  active: number;
  setActive: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <div className='col-start-1 col-end-2 hidden flex-col items-center justify-between rounded-3xl md:flex'>
        <div>
          <span className='flex h-9 w-9 items-center justify-center'>
            <ChatBubbleOvalLeftIcon className='fill-custom-green h-8 w-8' />
          </span>
          <span className='flex h-9 w-9 items-center justify-center pt-5'>
            <BuildingStorefrontIcon className='fill-custom-green h-8 w-8' />
          </span>
        </div>
        <span className='flex h-9 w-9 items-center justify-center'>
          <Cog6ToothIcon className='fill-custom-green h-8 w-8' />
        </span>
      </div>

      <div className='bg-custom-gray col-start-1 col-end-25 overflow-hidden rounded-xl border-1 md:col-start-2 md:col-end-9 md:mr-8 lg:col-end-8'>
        <div className='n h-full max-h-full w-full overflow-y-scroll p-4 text-white'>
          <h1 className='text-3xl'>Chat&apos;s</h1>

          {fakeData.map((friend, i) => (
            <div
              className={`my-4 ${active === friend.index ? 'bg-amber-50/10' : ''} flex rounded-2xl hover:bg-amber-50/10`}
              key={i + friend.name}
              onClick={() => setActive(friend.index)}
            >
              <Image
                src={friend.image_url}
                alt={`Image of ${friend.name}`}
                width={40}
                height={40}
                className='m-2 inline rounded-full'
              />

              <div className='flex flex-col justify-center'>
                <span className='font-bold'>{friend.name}</span>
                <span className='text-sm'>{friend.last_text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
