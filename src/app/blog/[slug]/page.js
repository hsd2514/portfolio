import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, Calendar } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Harsh Dange`,
    description: post.description,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <article className="mx-auto w-full max-w-2xl px-6 py-12 sm:py-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-8 space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.readTime && <span>{post.readTime}</span>}
          </div>

          {post.description && (
            <p className="text-lg text-muted-foreground">{post.description}</p>
          )}
        </header>

        {/* Content */}
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold mt-8 mb-4 text-foreground">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-bold mt-6 mb-3 text-foreground">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold mt-4 mb-2 text-foreground">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-1">{children}</ol>
              ),
              li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
                >
                  {children}
                </a>
              ),
              code: ({ inline, children }) => {
                if (inline) {
                  return (
                    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
                      {children}
                    </code>
                  );
                }
                return (
                  <code className="block font-mono text-sm">{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-muted border border-border p-4 rounded-lg overflow-x-auto my-4 text-sm">
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-border pl-4 my-4 text-muted-foreground italic">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-8 border-border" />,
              strong: ({ children }) => (
                <strong className="font-semibold text-foreground">{children}</strong>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to all posts
          </Link>
        </footer>
      </article>
    </main>
  );
}
