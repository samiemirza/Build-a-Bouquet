import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-5 py-16 sm:px-8">
      <section className="w-full rounded-3xl border border-rose-100 bg-white/90 p-8 shadow-soft sm:p-12">
        <p className="mb-4 inline-flex rounded-full bg-petal px-3 py-1 text-xs font-normal uppercase tracking-wide text-rose-700">
          Digital Bouquet
        </p>
        <h1 className="max-w-2xl text-4xl font-normal tracking-tight text-ink sm:text-5xl">
          Send a tiny bouquet.
        </h1>
        <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">
          Pick a flower, pick a wrapping, add a short note, and share a single beautiful link.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/create"
            className="rounded-xl bg-ink px-5 py-3 text-sm font-normal text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            Create bouquet
          </Link>
          <span className="text-sm text-slate-500">No login. No app install. Fast and lightweight.</span>
        </div>
      </section>
    </div>
  );
}
