'use client';

import Link from 'next/link';
import { FormEvent, useRef } from 'react';
import { logInWithEmail } from './lib/appwrite';

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    try {
      await logInWithEmail(formData);
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error instanceof Error ? error.message : 'Failed to sign up');
    }
  };
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='bg-custom-gray/20 flex h-full w-full flex-col items-center p-4 text-white shadow-lg lg:h-[60%] lg:w-[50%] lg:rounded-tl-lg lg:rounded-tr-4xl lg:rounded-br-lg lg:rounded-bl-4xl lg:border-1 lg:border-zinc-300/30'>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex h-[50%] w-[60%] flex-col items-center justify-between text-white'
        >
          <h1 className='mb-5 text-5xl font-bold'>Log in</h1>
          <input
            className='bg-custom-black mt-2 w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            placeholder='example@gmail.com'
            type='email'
            name='email'
          />
          <input
            className='bg-custom-black w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            type='password'
            placeholder='Your password'
            name='password'
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
        <h1 className='pt-6 text-white'>Don&apos;t have a account ? </h1>
        <Link className='text-custom-green' href='/register'>
          Register
        </Link>
      </div>
    </div>
  );
}
