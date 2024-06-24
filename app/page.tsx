"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Welcome to the Weather App</h1>
      {!session ? (
        <button
          onClick={() => signIn()}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <Link href="/weather" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
              Go to Weather Page
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
