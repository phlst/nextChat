import {
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';

const fakeData = [
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
  {
    name: 'Jozko Pobehly',
    last_text: 'How are you my brother ?',
    image_url:
      'https://cloud.appwrite.io/v1/storage/buckets/67fa6ff400122e19ff94/files/anonymousImage/view?project=67fa6fdf00351ccdec37&mode=admin',
  },
];

function page() {
  return (
    <div className='grid-row-2 grid h-screen w-screen grid-cols-24 py-8 pr-8 pl-8 md:pl-0'>
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

      <div className='bg-custom-gray col-start-1 col-end-25 rounded-xl border-1 md:col-start-2 md:col-end-9 md:mr-8 lg:col-end-8'>
        <div className='h-full w-full text-white'>
          {fakeData.map((friend, i) => (
            <div key={i + friend.name}>
              <Image
                src={friend.image_url}
                alt={`Image of ${friend.name}`}
                width={30}
                height={30}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='bg-custom-gray col-start-9 col-end-25 hidden rounded-xl md:block lg:col-start-8'>
        <input type='text' placeholder='Search your friend' className='' />
      </div>
    </div>
  );
}

export default page;
