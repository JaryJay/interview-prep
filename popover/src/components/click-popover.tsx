import { cloneElement, PropsWithChildren, ReactElement, useEffect, useRef, useState } from "react";

export type Side = "top" | "right" | "bottom" | "left"

export interface ClickPopoverProps {
	trigger?: ReactElement
	side?: Side
}


function ClickPopover({ children, trigger, side }: PropsWithChildren<ClickPopoverProps>) {
	const parentRef = useRef<HTMLDivElement>(null)
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (clickEvent: MouseEvent): void => {
			if (parentRef.current && !parentRef.current.contains(clickEvent.target as Node) && open) {
				setOpen(false)
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside)
	}, [parentRef])

	return (
		<div className="relative rounded-md shadow-lg" ref={parentRef}>
			{
				trigger ? cloneElement(trigger, { onClick: () => setOpen(!open) }) :
					<button onClick={() => setOpen(!open)} className="p-2">
						Click me
					</button>
			}
			<div className={"absolute bottom-full left-1/2 -translate-x-1/2 shadow-md z-10 w-48 transition-all transform " + (open ? "-translate-y-4 opacity-100" : "-translate-y-3 opacity-0 pointer-events-none")}>
				<div className="p-4 rounded-sm bg-white" tabIndex={0}>
					Contents!
					{children}
				</div>
				<div className="absolute left-1/2 -translate-x-1/2 border-red-400 border-8 border-x-transparent border-b-0" />
			</div>
		</div>
	)
}

export default ClickPopover
