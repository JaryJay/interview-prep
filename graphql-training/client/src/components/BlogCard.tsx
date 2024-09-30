import { Blog } from "../types"


interface BlogCardProps {
	blog: Blog
}

function BlogCard({ blog }: BlogCardProps) {
	return <div className="rounded-md bg-slate-600 p-4">
		<h1 className="text-lg font-bold">{blog.title}</h1>
		<h1 className="text-md truncate">{blog.description}</h1>
	</div>
}

export default BlogCard
