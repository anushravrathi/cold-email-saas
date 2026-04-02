import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Cold Email SaaS</h1>

      <Link href="/upload">
        <button className="bg-black text-white px-6 py-2 rounded">
          Start Campaign
        </button>
      </Link>
    </div>
  );
}