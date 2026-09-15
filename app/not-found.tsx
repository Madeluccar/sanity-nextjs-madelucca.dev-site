import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-6 md:px-16">
      <section className="max-w-6xl mx-auto py-12 md:py-20">
        <p className="text-sm font-mono tracking-widest text-zinc-400 mb-4">404</p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-blue-400 mb-6">
          OOOPS!
        </h1>
        <p className="text-xl sm:text-2xl text-zinc-200 max-w-xl leading-relaxed">
          My CV needs an update. It will be available soon!
        </p>
        <Link
          href="/"
          className="inline-flex mt-8 rounded-md bg-[#1d1d20] border border-zinc-700 px-5 py-3 font-medium hover:border-blue-400 hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400 transition-colors"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
