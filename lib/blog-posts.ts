// Blog posts data
export const allPosts = [
  {
    slug: "welcome",
    title: "Welcome to Ayzio Technology",
    date: "2024-01-01",
    excerpt: "Introduction to our platform",
    content: "Welcome to Ayzio Technology CRM system.",
  },
]

export function getPostBySlug(slug: string) {
  return allPosts.find((post) => post.slug === slug)
}
