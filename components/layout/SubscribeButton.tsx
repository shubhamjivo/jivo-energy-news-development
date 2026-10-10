"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";

// A Subscribe button that opens a pop-up asking for the reader's email and
// saves it through /api/subscribe.
export function SubscribeButton({
  children,
  className,
  source,
}: {
  children: ReactNode;
  className?: string;
  // Where the button sits, stored with the email (e.g. "Header").
  source: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  const open = () => {
    setStatus("idle");
    setError("");
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || "Could not subscribe right now. Please try again.");
      }
      setStatus("done");
      setEmail("");
    } catch (err) {
      setStatus("idle");
      setError(err instanceof Error ? err.message : "Could not subscribe right now.");
    }
  };

  return (
    <>
      <button type="button" className={className} onClick={open}>
        {children}
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="subscribe-title"
        // A click on the backdrop lands on the dialog element itself.
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-32px)] max-w-[440px] bg-paper p-0 text-left text-ink backdrop:bg-navy/60"
      >
        <div className="flex flex-col gap-4 p-6 desk:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold tracking-[1.1px] text-accent">
                AFRICA ENERGY BRIEF
              </p>
              <h2
                id="subscribe-title"
                className="mt-1 text-[24px] font-bold leading-[30px] text-ink"
              >
                {status === "done" ? "You’re subscribed." : "Subscribe to the Brief"}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="-mr-2 -mt-2 flex size-8 shrink-0 items-center justify-center text-muted hover:text-ink"
            >
              <svg aria-hidden viewBox="0 0 16 16" className="size-4">
                <path d="M2 2l12 12M14 2L2 14" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {status === "done" ? (
            <>
              <p className="text-sm leading-5 text-muted">
                Thank you. The Brief will arrive in your inbox.
              </p>
              <button
                type="button"
                onClick={close}
                className="flex h-11 items-center justify-center bg-accent text-sm font-semibold text-white"
              >
                Close
              </button>
            </>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <p className="text-sm leading-5 text-muted">
                The energy stories that matter across Africa, in your inbox.
              </p>
              <label className="flex flex-col gap-1.5 text-xs font-semibold text-ink">
                Email address
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 border border-hairline bg-white px-3 text-sm font-normal text-ink outline-none focus:border-accent"
                />
              </label>
              {error ? (
                <p role="alert" className="text-xs text-red-700">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex h-11 items-center justify-center bg-accent text-sm font-semibold text-white disabled:opacity-60"
              >
                {status === "sending" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
