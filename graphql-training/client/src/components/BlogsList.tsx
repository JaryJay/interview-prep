import { useEffect, useState } from "react";
import { Blog } from "../types";
import BlogCard from "./BlogCard";

function BlogsList() {
	const [blogs, setBlogs] = useState<Blog[]>([]);

	useEffect(() => {
		void (async () => {
			const res = await fetch("http://localhost:4000/graphql", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: `{
						blogs {
							title
							description
						}
					}`
				})
			})
			const data = (await res.json());
			setBlogs(data.data.blogs)
		})()
	}, [])


	return (
		<div className="space-y-4">
			{blogs.map(b => <BlogCard blog={b} key={b.title} />)}
		</div>
	)
}

export default BlogsList
