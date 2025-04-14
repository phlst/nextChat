import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='bg-custom-gray/20 flex h-full w-full flex-col items-center p-4 text-white lg:h-[60%] lg:w-[50%] lg:rounded-tl-lg lg:rounded-tr-4xl lg:rounded-br-lg lg:rounded-bl-4xl lg:border-1 lg:border-zinc-300/30'>
        <form className='flex h-[50%] w-[60%] flex-col items-center justify-between text-white'>
          <h1 className='mb-5 text-5xl'>Log in </h1>
          <input
            className='bg-custom-black mt-2 w-full rounded-lg border-1 border-zinc-50/10 p-4 outline-none'
            placeholder='example@gmail.com'
            type='email'
          ></input>
          <input
            className='bg-custom-black w-full rounded-lg border-1 border-zinc-50/10 p-4 outline-none'
            type='text'
            placeholder='Your password'
          />
          <button
            type='submit'
            className='bg-custom-green w-full rounded-md rounded-b-3xl px-5 py-2 text-lg font-bold text-amber-50'
          >
            Submit
          </button>
        </form>
        <div className='flex h-[50%] w-[60%] flex-col items-center'>
          <p className='mt-5 mb-2 text-lg'>Or log in with: </p>
          <div className='bg-custom-gray mb-3 h-1 w-[60%]'></div>
          <div className='mb-6 flex h-15 w-65 content-center justify-center rounded-xl border-1 bg-amber-50'>
            <Image
              src='/google.svg'
              alt='google login'
              height={50}
              width={50}
            />
          </div>
          <div className='flex h-15 w-65 items-center justify-center rounded-xl border-1 bg-amber-50'>
            <Image
              src='/github.svg'
              alt='github login'
              height={50}
              width={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
