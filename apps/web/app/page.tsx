import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="w-full flex flex-col gap-6 justify-center items-center mt-12">
        <h1 className="text-5xl text-white">Message Sender</h1>

        <Link href="/login">
          <button className="bg-purple-700 p-2 font-semibold rounded-xl cursor-pointer">
            Login/Cadastro
          </button>
        </Link>
      </div>
    </div>
  );
}
