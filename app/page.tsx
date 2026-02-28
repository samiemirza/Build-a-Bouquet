import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-[48rem]">
        <h1 className="text-center text-3xl font-normal tracking-tight text-ink sm:text-5xl">
          Build a Bouquet
        </h1>

        <section className="mt-8 w-full rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:mt-10 sm:p-6">
          <div className="space-y-4 min-h-[38rem] sm:min-h-[46rem]">
            <div className="mx-auto mt-1 w-full max-w-[39rem] bg-white p-2 sm:mt-2 sm:p-4">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/flowers/homepage.png"
                  alt="Bouquet preview"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 624px"
                />
              </div>
            </div>

            <p className="text-center text-sm text-slate-600 sm:text-lg">
              Create and share a digital bouquet with a personal note in one beautiful link.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/create"
                className="rounded-xl bg-ink px-5 py-3 text-sm font-normal text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
              >
                Create
              </Link>
            </div>
          </div>
        </section>

        <p className="mt-12 text-center text-sm text-slate-500 sm:mt-20 sm:text-lg">
          made by{" "}
          <a
            href="https://github.com/samiemirza/"
            target="_blank"
            rel="noreferrer"
            className="text-slate-600 underline decoration-slate-300 underline-offset-2"
          >
            @samiemirza
          </a>
        </p>
      </div>
    </div>
  );
}
