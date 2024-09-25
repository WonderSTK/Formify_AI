"use client"
import { AtomIcon, Edit, Share2 } from 'lucide-react';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; // Updated import

function Hero() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStartedClick = () => {
    if (isSignedIn) {
      // Redirect to dashboard if the user is signed in
      router.push('/dashboard');
    } else {
      // Otherwise, go to the sign-in page
      router.push('/sign-in');
    }
  };

  return (
    <section className="h-[500px] bg-[url('/grid.svg')] bg-cover bg-center">
      <div className="mx-auto max-w-screen-xl z-30 px-4 pt-32 lg:flex ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Build Your Forms 
            <strong className="font-extrabold text-primary sm:block">In Seconds, Not Hours</strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-600">
            Easily generate forms with AI, publish them instantly, and share with your audience. Start gathering responses and track real-time analytics effortlessly.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleGetStartedClick}
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-purple-600 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>

      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-56 ">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How It Works</h2>

            <p className="mt-4 text-gray-600">
              Our AI-powered platform helps you create forms in a few simple steps. Customize, share, and start collecting data in no time.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className='h-8 w-8' />
              <h2 className="mt-4 text-xl font-bold text-black">Generate Form with AI</h2>
              <p className="mt-1 text-sm text-gray-600">
                Use AI to quickly generate a form tailored to your needs. Just enter your prompt, and we'll do the rest.
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className='h-8 w-8' />
              <h2 className="mt-4 text-xl font-bold text-black">Customize Your Form</h2>
              <p className="mt-1 text-sm text-gray-600">
                Edit and personalize the form fields, design, and structure to fit your specific requirements.
              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className='h-8 w-8' />
              <h2 className="mt-4 text-xl font-bold text-black">Share & Gather Responses</h2>
              <p className="mt-1 text-sm text-gray-600">
                Share your form with a click and start gathering responses instantly. View insights and analytics in real-time.
              </p>
            </a>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleGetStartedClick}
              className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Hero;
