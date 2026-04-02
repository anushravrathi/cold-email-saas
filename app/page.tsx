"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();

  

const [loading, setLoading] = useState(false);

const sendEmail = async () => {
  if (loading) return;

  setLoading(true);

  await fetch("/api/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: session?.accessToken,
      contacts: [
        {
          name: "Rahul",
          email: "your_email@gmail.com",
          company: "Google",
        },
        {
          name: "Priya",
          email: "your_email@gmail.com",
          company: "Amazon",
        },
      ],
    }),
  });

  setLoading(false);
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
      <p className="text-lg font-semibold">
        Welcome {session.user?.name}
      </p>

      <button
  onClick={sendEmail}
  disabled={loading}
  className="bg-green-600 text-white px-6 py-2 rounded"
>
  {loading ? "Sending..." : "Send Emails 🚀"}
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