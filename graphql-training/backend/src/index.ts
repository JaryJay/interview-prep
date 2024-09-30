import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

const blogs = [
	{
		title: 'Blog 1',
		description: 'Hello world',
	},
	{
		title: 'Blog 2',
		description: 'Yayyy',
	},
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Blog" type defines the queryable fields for every book in our data source.
  type Blog {
    title: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "blogs" query returns an array of zero or more Blogs (defined above).
  type Query {
    blogs: [Blog]
  }

	type Mutation {
		addBlog(title: String!, description: String!): Blog!
	}
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves blogs from the "blogs" array above.
const resolvers = {
	Query: {
		blogs: () => blogs,
	},
	Mutation: {
		addBlog: (parent, args) => {
			const newBlog = {
				title: args.title,
				description: args.description,
			};
			blogs.push(newBlog);
			return newBlog;
		},
	},
};



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
	introspection: true,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
