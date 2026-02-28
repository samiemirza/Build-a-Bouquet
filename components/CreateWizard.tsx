"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CompositePreview from "@/components/CompositePreview";
import OptionGrid from "@/components/OptionGrid";
import Progress from "@/components/Stepper/Progress";
import { flowers, wraps } from "@/lib/options";
import { MAX_NOTE_LENGTH, encodePayload, normalizeNote } from "@/lib/share";

const STEP_LABELS = ["Flower", "Wrapping", "Note", "Share"];

export default function CreateWizard() {
  const [step, setStep] = useState(1);
  const [selectedFlowerId, setSelectedFlowerId] = useState<string>();
  const [selectedWrapId, setSelectedWrapId] = useState<string>();
  const [note, setNote] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");

  const selectedFlower = useMemo(
    () => flowers.find((flower) => flower.id === selectedFlowerId),
    [selectedFlowerId]
  );

  const selectedWrap = useMemo(
    () => wraps.find((wrap) => wrap.id === selectedWrapId),
    [selectedWrapId]
  );

  const normalizedNote = normalizeNote(note).slice(0, MAX_NOTE_LENGTH);
  const previewNote = normalizedNote.slice(0, MAX_NOTE_LENGTH);
  const isNoteValid = normalizedNote.length > 0;

  useEffect(() => {
    if (copyState !== "success") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopyState("idle");
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [copyState]);

  const canGoNext =
    (step === 1 && Boolean(selectedFlower)) ||
    (step === 2 && Boolean(selectedWrap)) ||
    (step === 3 && isNoteValid);
  const showSidePreview = false;

  function buildShareLink(): string {
    if (!selectedFlowerId || !selectedWrapId) {
      return "";
    }

    const payload = encodePayload({
      f: selectedFlowerId,
      w: selectedWrapId,
      n: normalizedNote
    });

    const base = window.location.origin;
    return `${base}/b/${payload}`;
  }

  function handleNext() {
    if (step === 1 && selectedFlower) {
      setStep(2);
      return;
    }

    if (step === 2 && selectedWrap) {
      setStep(3);
      return;
    }

    if (step === 3 && canGoNext) {
      const nextLink = buildShareLink();
      setShareLink(nextLink);
      setCopyState("idle");
      setStep(4);
    }
  }

  async function handleCopy() {
    if (!shareLink) {
      return;
    }

    try {
      await navigator.clipboard.writeText(shareLink);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }
  }

  function reset() {
    setStep(1);
    setSelectedFlowerId(undefined);
    setSelectedWrapId(undefined);
    setNote("");
    setShareLink("");
    setCopyState("idle");
  }

  return (
    <div className={showSidePreview ? "grid gap-6 lg:grid-cols-[1fr_370px] lg:items-start" : ""}>
      {showSidePreview ? (
        <aside className="order-first lg:order-last lg:sticky lg:top-6">
          <div className="mx-auto w-full max-w-[260px]">
            <CompositePreview
              flowerSrc={selectedFlower?.src}
              wrapSrc={selectedWrap?.src}
              priority
              className="bg-white"
            />
          </div>
        </aside>
      ) : null}

      <section className="mx-auto w-full max-w-3xl space-y-4">
        <Progress currentStep={step} labels={STEP_LABELS} />

        <div className="rounded-2xl border border-rose-100 bg-white p-5 shadow-sm sm:p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <h2 className="text-center text-lg font-normal text-ink">Choose a flower</h2>
              <div className="mx-auto w-full max-w-[39rem]">
                <OptionGrid
                  items={flowers}
                  selectedId={selectedFlowerId}
                  onSelect={setSelectedFlowerId}
                  groupLabel="Flower option"
                  imageClassName="object-contain origin-top scale-[1.33]"
                />
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="mx-auto w-full max-w-[28rem]">
                <CompositePreview
                  flowerSrc={selectedFlower?.src}
                  wrapSrc={selectedWrap?.src}
                  plain
                  className="bg-white"
                />
              </div>
              <h2 className="text-center text-lg font-normal text-ink">Choose a wrapping</h2>
              <div className="mx-auto w-full max-w-[39rem]">
                <OptionGrid
                  items={wraps}
                  selectedId={selectedWrapId}
                  onSelect={setSelectedWrapId}
                  groupLabel="Wrapping option"
                  imageClassName="object-contain origin-bottom scale-[1.33] translate-y-[10%]"
                  horizontal
                />
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4 min-h-[32rem]">
              <div className="mx-auto w-full max-w-[28rem]">
                <CompositePreview
                  flowerSrc={selectedFlower?.src}
                  wrapSrc={selectedWrap?.src}
                  plain
                  className="bg-white"
                />
              </div>
              <div className="mx-auto w-full max-w-[39rem]">
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value.slice(0, MAX_NOTE_LENGTH))}
                  maxLength={MAX_NOTE_LENGTH}
                  rows={6}
                  placeholder="A tiny note from your heart..."
                  className="handwriting w-full resize-none bg-transparent px-1 py-2 text-3xl leading-tight text-slate-700 placeholder:text-slate-300 focus-visible:outline-none"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>{note.length}/{MAX_NOTE_LENGTH}</span>
                  {!isNoteValid ? (
                    <span className="text-rose-500">Please add a short note to continue.</span>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-4 min-h-[46rem]">
              <div className="mx-auto w-full max-w-[28rem]">
                <CompositePreview
                  flowerSrc={selectedFlower?.src}
                  wrapSrc={selectedWrap?.src}
                  plain
                  className="bg-white"
                />
              </div>
              <div className="mx-auto mt-4 w-full max-w-[39rem] space-y-4">
                <p className="text-sm text-slate-600">
                  Anyone with this link can open your bouquet and read the note.
                </p>

                <p className="handwriting max-h-[8rem] min-h-[4.5rem] overflow-hidden whitespace-pre-wrap break-words text-base leading-7 text-rose-700">
                  "{previewNote || " "}"
                </p>

                <label className="mt-10 block space-y-2">
                  <span className="text-xs font-normal uppercase tracking-wide text-slate-500">
                    Shareable link
                  </span>
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <input
                      value={shareLink}
                      readOnly
                      className="w-full bg-transparent text-sm text-slate-700 focus-visible:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      aria-label="Copy shareable link"
                      className="text-slate-500 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className="h-6 w-6"
                        aria-hidden
                      >
                        <rect x="9" y="9" width="10" height="10" rx="2" />
                        <rect x="5" y="5" width="10" height="10" rx="2" />
                      </svg>
                    </button>
                  </div>
                </label>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
            disabled={step === 1}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-normal text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className="rounded-xl bg-ink px-5 py-2 text-sm font-normal text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-45"
            >
              {step === 3 ? "Generate link" : "Next"}
            </button>
          ) : (
            <Link
              href={shareLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-rose-500 px-5 py-2 text-sm font-normal text-white shadow-sm transition hover:bg-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
            >
              Preview recipient
            </Link>
          )}
        </div>
      </section>

      {copyState === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed bottom-5 right-5 rounded-xl bg-ink px-3 py-2 text-xs font-normal text-white shadow-soft"
        >
          Link copied
        </div>
      ) : null}
    </div>
  );
}
