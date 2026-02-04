import { getAllPosts } from "@/lib/blog";
import HomePageClient from "./home-client";

export default function HomePage() {
  const posts = getAllPosts();
  const latestPost = posts.length > 0 ? posts[0] : null;

  return <HomePageClient latestPost={latestPost} />;
}
