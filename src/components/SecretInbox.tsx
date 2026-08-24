import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// Not actually secret once built — this string ships in the public JS bundle
// like any client-side constant. The Konami gate only keeps it out of a
// casual visitor's way; the iframe's own login is the real access control.
const INBOX_URL = "https://gigabyte.tail4e5b53.ts.net/";

export function SecretInbox() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let progress = 0;
    function onKeyDown(e: KeyboardEvent) {
      const expected = KONAMI[progress];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        progress += 1;
        if (progress === KONAMI.length) {
          progress = 0;
          setOpen(true);
        }
      } else {
        progress = key === KONAMI[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-background/95 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-end p-3 border-b border-border">
        <button
          onClick={() => setOpen(false)}
          className="text-sm text-muted-foreground hover:text-foreground px-3 py-1 rounded-md border border-border"
        >
          Close (Esc)
        </button>
      </div>
      <iframe
        src={INBOX_URL}
        title="inbox"
        className="flex-1 w-full border-0"
      />
    </div>
  );
}
