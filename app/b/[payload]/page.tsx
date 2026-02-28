import Link from "next/link";
import CompositePreview from "@/components/CompositePreview";
import { flowers, wraps } from "@/lib/options";
import { decodePayload } from "@/lib/share";

type BouquetViewPageProps = {
  params:
    | {
        payload: string;
      }
    | Promise<{
        payload: string;
      }>;
};

function ErrorState() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-8 sm:py-16">
      <div className="w-full space-y-4">
        <h2 className="text-center text-3xl font-normal tracking-tight text-ink sm:text-5xl">
          Build a Bouquet
        </h2>
        <div className="w-full rounded-3xl border border-rose-100 bg-white/90 p-5 text-center shadow-soft sm:p-10">
          <h1 className="text-2xl font-normal text-ink">This bouquet link looks invalid.</h1>
          <p className="mt-3 text-sm text-slate-600">
            The link may be broken, too old, or missing details. Create a fresh bouquet below.
          </p>
          <Link
            href="/create"
            className="mt-6 inline-flex rounded-xl bg-ink px-5 py-2.5 text-sm font-normal text-white transition hover:opacity-90"
          >
            Create a new bouquet
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function BouquetViewPage({ params }: BouquetViewPageProps) {
  const resolvedParams = await params;
  const decoded = decodePayload(resolvedParams.payload);

  if (!decoded) {
    return <ErrorState />;
  }

  const flower = flowers.find((item) => item.id === decoded.f);
  const wrap = wraps.find((item) => item.id === decoded.w);

  if (!flower || !wrap) {
    return <ErrorState />;
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-4 py-8 sm:px-8 sm:py-16">
      <div className="w-full space-y-4">
        <h1 className="-translate-y-8 mb-6 text-center text-3xl font-normal tracking-tight text-ink sm:-translate-y-12 sm:mb-8 sm:text-5xl">
          Build a Bouquet
        </h1>
        <article className="w-full rounded-2xl border border-rose-100 bg-white p-4 shadow-sm sm:p-6">
          <section className="space-y-4 min-h-[27rem] sm:min-h-[32rem]">
            <div className="mx-auto w-full max-w-[28rem]">
              <CompositePreview flowerSrc={flower.src} wrapSrc={wrap.src} plain priority className="bg-white" />
            </div>
            <div className="mx-auto w-full max-w-[39rem]">
              <p className="handwriting whitespace-pre-wrap break-words px-1 py-2 text-2xl leading-tight text-rose-700 sm:text-3xl">
                {decoded.n || "(No note attached.)"}
              </p>
            </div>
          </section>

          <footer className="mt-8 border-t border-rose-100 pt-5 text-center">
            <p className="text-sm text-slate-600">
              This was made using Build a Bouquet, an app by{" "}
              <a
                href="https://github.com/samiemirza/"
                target="_blank"
                rel="noreferrer"
                className="text-rose-700 underline decoration-rose-200 underline-offset-2"
              >
                @samiemirza
              </a>
              .
            </p>
            <div className="mt-4">
              <Link
                href="/create"
                className="inline-flex rounded-xl bg-rose-500 px-5 py-2 text-sm font-normal text-white transition hover:bg-rose-600"
              >
                Build now
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}
