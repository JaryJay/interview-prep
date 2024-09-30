import { PropsWithChildren } from "react"
import BlogsList from "../components/BlogsList"

function BlogsMainPage() {

	return (
		<div className="h-screen bg-slate-900 p-4">
			<div className="grid grid-cols-5 gap-4 w-full text-slate-100">
				<Column className="col-span-4">
					<BlogsList />
				</Column>
				<Column>
					Some random stuff
				</Column>
			</div>
		</div>
	)
}

export default BlogsMainPage


function Column({ className = "", children }: PropsWithChildren<{ className?: string }>) {
	return <div className={className + " border border-slate-500 bg-slate-800 p-4 rounded-lg"}>
		{children}
	</div>
}
