import Image from "next/image";

type CompositePreviewProps = {
  flowerSrc?: string;
  wrapSrc?: string;
  priority?: boolean;
  className?: string;
  plain?: boolean;
};

export default function CompositePreview({
  flowerSrc,
  wrapSrc,
  priority = false,
  className = "",
  plain = false
}: CompositePreviewProps) {
  const hasAnyLayer = Boolean(flowerSrc || wrapSrc);

  return (
    <div
      className={`${
        plain
          ? "rounded-2xl bg-transparent p-0 shadow-none"
          : "rounded-2xl border border-rose-100 bg-white/95 p-4 shadow-soft"
      } ${className}`.trim()}
      aria-label="Bouquet live preview"
    >
      <div
        className={`relative aspect-square overflow-hidden rounded-xl ${
          plain
            ? "border-0 bg-transparent"
            : "border border-rose-100/80 bg-gradient-to-br from-white via-pink-50/40 to-lavender/40"
        }`}
      >
        {wrapSrc ? (
          <Image
            src={wrapSrc}
            alt="Selected wrapping"
            fill
            priority={priority}
            className="z-10 object-contain"
            sizes="(max-width: 768px) 90vw, 34vw"
          />
        ) : null}

        {flowerSrc ? (
          <Image
            src={flowerSrc}
            alt="Selected flower"
            fill
            priority={priority}
            className="z-0 object-contain"
            sizes="(max-width: 768px) 90vw, 34vw"
          />
        ) : null}

        {!hasAnyLayer ? (
          <div className="absolute inset-0 z-20 flex items-center justify-center text-center text-sm text-slate-500">
            Pick a flower and wrapping to build your bouquet.
          </div>
        ) : null}
      </div>
    </div>
  );
}
