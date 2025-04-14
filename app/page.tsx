import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='bg-custom-gray/20 flex h-full w-full flex-col items-center p-4 text-white shadow-lg lg:h-[60%] lg:w-[50%] lg:rounded-tl-lg lg:rounded-tr-4xl lg:rounded-br-lg lg:rounded-bl-4xl lg:border-1 lg:border-zinc-300/30'>
        <form className='flex h-[50%] w-[60%] flex-col items-center justify-between text-white'>
          <h1 className='mb-5 text-5xl font-bold'>Log in</h1>
          <input
            className='bg-custom-black mt-2 w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            placeholder='example@gmail.com'
            type='email'
          />
          <input
            className='bg-custom-black w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            type='password'
            placeholder='Your password'
          />
          <div className='mt-1 flex w-full justify-end'>
            <a href='#' className='text-custom-green text-sm hover:underline'>
              Forgot password?
            </a>
          </div>
          <button
            type='submit'
            className='bg-custom-green hover:bg-opacity-90 w-full rounded-md rounded-b-3xl px-5 py-2 text-lg font-bold text-amber-50 transition-opacity'
          >
            Login
          </button>
        </form>
        <div className='flex h-[50%] w-[60%] flex-col items-center'>
          <p className='mt-5 mb-2 text-lg'>Or log in with:</p>
          <div className='bg-custom-gray mb-3 h-1 w-[60%]'></div>
          <div className='mb-3 flex h-12 w-full cursor-pointer content-center justify-center rounded-xl border-1 bg-amber-50 transition-colors hover:bg-amber-100'>
            <Image
              src='/google.svg'
              alt='google login'
              height={40}
              width={40}
            />
          </div>
          <div className='flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border-1 bg-amber-50 transition-colors hover:bg-amber-100'>
            <Image
              src='/github.svg'
              alt='github login'
              height={40}
              width={40}
            />
          </div>

          <p className='mt-5 text-sm'>
            Don&apos;t have an account?
            <Link
              href='/register'
              className='text-custom-green hover:underline'
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
