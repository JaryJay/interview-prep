import { cloneElement, PropsWithChildren, ReactElement, useCallback, useState } from "react"

export type Side = "top" | "right" | "bottom" | "left"

export interface PopoverProps {
	trigger?: ReactElement
	delay?: number
	closeDelay?: number
	side?: Side
}

function Popover({ children, trigger, delay = 50, closeDelay = 100, side = "top" }: PropsWithChildren<PopoverProps>) {
	if (delay && delay < 0) {
		throw new Error(`Delay must be non-negative: ${delay}`)
	}

	const [hoverDelayTimerHandle, setHoverDelayTimerHandle] = useState<number | undefined>();
	const [open, setOpen] = useState(false)

	// useEffect(() => {
	// 	return () => {
	// 	}
	// }, [])

	const onMouseEnter = useCallback(() => {
		if (hoverDelayTimerHandle !== undefined) {
			clearTimeout(hoverDelayTimerHandle);
		}
		const newTimerHandle = setTimeout(() => {
			setOpen(true);
		}, delay);
		setHoverDelayTimerHandle(newTimerHandle)
	}, [hoverDelayTimerHandle, setHoverDelayTimerHandle])
	const onMouseLeave = useCallback(() => {
		if (hoverDelayTimerHandle !== undefined) {
			clearTimeout(hoverDelayTimerHandle);
		}
		const newTimerHandle = setTimeout(() => {
			setOpen(false);
		}, closeDelay);
		setHoverDelayTimerHandle(newTimerHandle)
	}, [hoverDelayTimerHandle, setHoverDelayTimerHandle])

	const contentOnMouseEnter = useCallback(() => {
		if (hoverDelayTimerHandle !== undefined) {
			clearTimeout(hoverDelayTimerHandle);
		}
		const newTimerHandle = setTimeout(() => {
			setOpen(true);
		}, delay);
		setHoverDelayTimerHandle(newTimerHandle)
	}, [hoverDelayTimerHandle, setHoverDelayTimerHandle])
	const contentOnMouseLeave = useCallback(() => {
		if (hoverDelayTimerHandle !== undefined) {
			clearTimeout(hoverDelayTimerHandle);
		}
		const newTimerHandle = setTimeout(() => {
			setOpen(false);
		}, closeDelay);
		setHoverDelayTimerHandle(newTimerHandle)
	}, [hoverDelayTimerHandle, setHoverDelayTimerHandle])

	return (
		<div>
			<div className="relative bg-green-100">
				{/* Trigger */}
				{
					trigger ?
						cloneElement(trigger, { onMouseEnter, onMouseLeave }) :
						<button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
							Button
						</button>
				}

				{/* Content */}
				<div
					className={"absolute bottom-full left-1/2 transform -translate-x-1/2 rounded-md shadow-md bg-white transition-all " + (open ? "-translate-y-4 opacity-100" : "-translate-y-3 opacity-0")}
					onMouseEnter={open ? contentOnMouseEnter : undefined}
					onMouseLeave={open ? contentOnMouseLeave : undefined}
				>
					{/* Arrow */}
					<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full border-x-transparent  border-t-white border-b-0 border-8" />
					<div className="w-64 rounded-md">
						{children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Popover
