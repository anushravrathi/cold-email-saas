"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const sendEmail = async () => {
    console.log("SESSION:", session);

    await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: session?.accessToken,
        to: "YOUR_OTHER_EMAIL@gmail.com", // ⚠️ use DIFFERENT email
        name: "Rahul",
        company: "Google",
      }),
    });
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <button
          onClick={() => signIn("google")}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>Welcome {session.user?.name}</p>

      <button
        onClick={sendEmail}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Send Test Email 🚀
      </button>

      <button
        onClick={() => signOut()}
        className="bg-red-600 text-white px-6 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}