import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl pb-4">Welcome to the journal app</h1>
        <p className="text-2xl text-white/80 pb-4">This is an ai powered journal application. It can help you keep track of your thoughts and feelings.</p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
