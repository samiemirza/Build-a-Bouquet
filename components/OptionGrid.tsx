"use client";

import { useRef } from "react";
import Image from "next/image";
import type { BouquetOption } from "@/lib/options";

type OptionGridProps = {
  items: BouquetOption[];
  selectedId?: string;
  onSelect: (id: string) => void;
  groupLabel: string;
  imageClassName?: string;
  horizontal?: boolean;
};

export default function OptionGrid({
  items,
  selectedId,
  onSelect,
  groupLabel,
  imageClassName,
  horizontal = false
}: OptionGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const renderCard = (item: BouquetOption) => {
    const isSelected = selectedId === item.id;

    return (
      <button
        type="button"
        key={item.id}
        onClick={() => onSelect(item.id)}
        aria-pressed={isSelected}
        aria-label={`${groupLabel}: ${item.name}`}
        className={`rounded-2xl border bg-white p-3 text-center shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 ${
          isSelected ? "border-rose-300 ring-2 ring-rose-200" : "border-slate-200"
        } ${horizontal ? "min-w-[12.5rem] shrink-0 snap-start" : "hover:-translate-y-0.5"}`}
      >
        <div className="relative mb-2 aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 via-white to-mint/50">
          <Image
            src={item.src}
            alt={item.name}
            fill
            className={imageClassName ?? "object-contain"}
            sizes="(max-width: 768px) 42vw, 16vw"
          />
        </div>
        <span className="block text-sm font-normal leading-tight text-ink">{item.name}</span>
      </button>
    );
  };

  if (!horizontal) {
    return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{items.map(renderCard)}</div>;
  }

  function scrollRow(direction: "left" | "right") {
    const node = scrollRef.current;
    if (!node) return;
    const amount = direction === "left" ? -220 : 220;
    node.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollRow("left")}
        aria-label={`Scroll ${groupLabel} left`}
        className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 px-1 text-6xl leading-none text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 sm:-left-6"
      >
        {"\u2039"}
      </button>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1 pt-1 scroll-smooth"
      >
        {items.map(renderCard)}
      </div>

      <button
        type="button"
        onClick={() => scrollRow("right")}
        aria-label={`Scroll ${groupLabel} right`}
        className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 px-1 text-6xl leading-none text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 sm:-right-6"
      >
        {"\u203a"}
      </button>
    </div>
  );
}
