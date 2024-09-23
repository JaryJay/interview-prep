import {
  cloneElement,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

export type Side = "top" | "right" | "bottom" | "left";

export interface ClickPopoverProps {
  side?: Side;
}

function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onClick: () => void
) {
  useEffect(() => {
    const handleClickOutside = (clickEvent: MouseEvent): void => {
      if (ref.current && !ref.current.contains(clickEvent.target as Node)) {
        onClick();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [ref]);
}

function ClickPopover({ children }: PropsWithChildren<ClickPopoverProps>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickOutside(parentRef, () => {
    if (open) setOpen(false);
  });

  return (
    <div className="relative rounded-md shadow-lg" ref={parentRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2"
        aria-haspopup
        aria-expanded={open}
      >
        Click me
      </button>
      <div
        className={
          "absolute bottom-full left-1/2 -translate-x-1/2 shadow-md z-10 w-48 transition-all transform " +
          (open
            ? "-translate-y-4 opacity-100"
            : "-translate-y-3 opacity-0 pointer-events-none")
        }
      >
        <div className="p-4 bg-white rounded-sm" tabIndex={0}>
          Contents!
          {children}
        </div>
        <div className="absolute -translate-x-1/2 border-8 border-b-0 border-red-400 left-1/2 border-x-transparent" />
      </div>
    </div>
  );
}

export default ClickPopover;
