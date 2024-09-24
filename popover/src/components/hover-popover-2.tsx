import { PropsWithChildren, useCallback, useState } from "react";

export type HoverPopover2Props = PropsWithChildren<{
  delay?: number;
}>;

export default function HoverPopover2({
  children,
  delay = 200,
}: HoverPopover2Props) {
  const [closeTimeout, setCloseTimeout] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const onMouseEnter = useCallback(() => {
    if (closeTimeout !== null) {
      clearTimeout(closeTimeout);
    }
    setOpen(true);
  }, [closeTimeout]);
  const onMouseLeave = useCallback(() => {
    if (closeTimeout !== null) {
      clearTimeout(closeTimeout);
    }
    const newTimeout = setTimeout(() => {
      setOpen(false);
    }, delay);
    setCloseTimeout(newTimeout);
  }, [closeTimeout]);

  return (
    <div className="relative" role="tooltip">
      <button
        className="px-2 py-1 border border-gray-400 rounded-md"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        Trigger
      </button>
      <div
        className={
          "absolute w-48 p-4 left-1/2 -translate-x-1/2 bottom-full -translate-y-4 shadow-lg " +
          (open ? "" : "opacity-0")
        }
        role="dialog"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
        {/* Triangle */}
        <div className="absolute -translate-x-1/2 border-8 border-b-0 border-white left-1/2 top-full border-x-transparent" />
      </div>
    </div>
  );
}
