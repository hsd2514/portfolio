import { getAllPosts } from "@/lib/blog";
import BlogPageClient from "./client";

export const metadata = {
  title: "Blog | Harsh Dange",
  description: "My thoughts on software development, AI, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogPageClient posts={posts} />;
}
