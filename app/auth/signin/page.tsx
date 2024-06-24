import { getProviders, signIn } from "next-auth/react";

const SignInPage = async () => {
  const providers = await getProviders();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">Sign In</h1>
      {providers && Object.values(providers).map((provider) => (
        <button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  );
};

export default SignInPage;
