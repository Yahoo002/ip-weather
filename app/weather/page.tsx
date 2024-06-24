"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Updated import
import WeatherComponent from '../components/WeatherComponent';
import { useEffect } from 'react';

const WeatherPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <WeatherComponent />
    </div>
  );
};

export default WeatherPage;

