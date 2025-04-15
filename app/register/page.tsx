'use client';
import Link from 'next/link';
import { signUpWithEmail } from '../lib/appwrite';
import { FormEvent, useRef } from 'react';

function Page() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await signUpWithEmail(formData);
      // Redirect or show success message
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error instanceof Error ? error.message : 'Failed to sign up');
    }
  };

  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='bg-custom-gray/20 flex h-full w-full flex-col items-center p-4 text-white lg:h-[70%] lg:w-[50%] lg:rounded-tl-lg lg:rounded-tr-4xl lg:rounded-br-lg lg:rounded-bl-4xl lg:border-1 lg:border-zinc-300/30'>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='flex h-[60%] w-[60%] flex-col items-center justify-between text-white'
        >
          <h1 className='mb-5 text-5xl'>Sign Up</h1>
          <input
            className='bg-custom-black mt-2 w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            placeholder='Your full name'
            type='text'
            name='name'
            required
          />
          <input
            className='bg-custom-black mt-2 w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            placeholder='example@gmail.com'
            type='email'
            name='email'
            required
          />
          <input
            className='bg-custom-black mt-2 w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            type='password'
            placeholder='Create password'
            name='password'
            required
          />
          <input
            className='bg-custom-black mt-2 w-full rounded-lg border-1 border-zinc-50/10 p-4 transition-colors outline-none focus:border-zinc-50/30'
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            required
          />
          <button
            type='submit'
            className='bg-custom-green hover:bg-opacity-90 mt-2 w-full rounded-md rounded-b-3xl px-5 py-2 text-lg font-bold text-amber-50 transition-opacity'
          >
            Create Account
          </button>
        </form>
        <h1 className='pt-6 text-white'>Already have a account ? </h1>
        <Link className='text-custom-green' href='/'>
          Log in
        </Link>
      </div>
    </div>
  );
}

export default Page;
