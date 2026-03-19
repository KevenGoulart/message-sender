import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="w-full flex flex-col gap-6 justify-center items-center mt-28">
        <h1 className="text-4xl text-white">Message Sender</h1>

        <Link href="/login">
          <button className="bg-purple-700 p-2 font-semibold rounded-xl">
            Fazer Login
          </button>
        </Link>
      </div>
    </div>
  );
}
