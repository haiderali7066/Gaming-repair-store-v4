import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Tag,
} from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt?: string;
  createdAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlog(
  slug: string
): Promise<Blog | null> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  try {
    const response = await fetch(
      `${baseUrl}/api/blogs/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();

    return data.success ? data.blog : null;
  } catch (error) {
    console.error("GET BLOG ERROR:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.seoTitle || blog.title,
    description:
      blog.seoDescription ||
      blog.excerpt ||
      blog.title,

    keywords: blog.tags,

    openGraph: {
      title: blog.seoTitle || blog.title,
      description:
        blog.seoDescription ||
        blog.excerpt ||
        blog.title,
      type: "article",
      publishedTime:
        blog.publishedAt || blog.createdAt,
      authors: [blog.author],
      images: blog.coverImage
        ? [
            {
              url: blog.coverImage,
              alt: blog.title,
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: blog.seoTitle || blog.title,
      description:
        blog.seoDescription ||
        blog.excerpt ||
        blog.title,
      images: blog.coverImage
        ? [blog.coverImage]
        : undefined,
    },

    alternates: {
      canonical: `/blog/${blog.slug}`,
    },
  };
}

function formatDate(date?: string) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}

function renderContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="h-5" />;
    }

    // H2
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={index}
          className="mb-5 mt-12 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl"
        >
          {trimmed.replace("## ", "")}
        </h2>
      );
    }

    // H3
    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={index}
          className="mb-4 mt-10 text-xl font-bold text-gray-950"
        >
          {trimmed.replace("### ", "")}
        </h3>
      );
    }

    // Bullet
    if (trimmed.startsWith("- ")) {
      return (
        <li
          key={index}
          className="ml-6 pl-2 text-base leading-8 text-gray-700 marker:text-purple-600"
        >
          {trimmed.replace("- ", "")}
        </li>
      );
    }

    return (
      <p
        key={index}
        className="mb-6 text-[17px] leading-8 text-gray-700"
      >
        {trimmed}
      </p>
    );
  });
}

export default async function BlogDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  const readingTime = estimateReadingTime(
    blog.content
  );

  return (
    <main className="min-h-screen bg-white">
      {/* TOP HERO */}
      <section className="relative overflow-hidden border-b border-purple-100 bg-purple-50/50">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-200/50 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
          {/* Back */}
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-purple-600"
          >
            <ArrowLeft size={16} />
            Back to articles
          </Link>

          {/* Category */}
          <div>
            <span className="inline-flex items-center rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-purple-200">
              {blog.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-7 max-w-4xl text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-600 lg:text-xl">
              {blog.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CalendarDays
                size={16}
                className="text-purple-600"
              />

              {formatDate(
                blog.publishedAt || blog.createdAt
              )}
            </span>

            <span className="flex items-center gap-2">
              <Clock3
                size={16}
                className="text-purple-600"
              />

              {readingTime}
            </span>

            <span>
              By{" "}
              <strong className="text-gray-900">
                {blog.author}
              </strong>
            </span>
          </div>
        </div>
      </section>

      {/* FEATURE IMAGE */}
      {blog.coverImage && (
        <section className="mx-auto max-w-6xl px-6 pt-10 lg:px-8 lg:pt-14">
          <div className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-purple-50 shadow-2xl shadow-purple-100/50">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="max-h-[680px] w-full object-cover transition duration-700 group-hover:scale-[1.01]"
            />

            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
          </div>
        </section>
      )}

      {/* ARTICLE BODY */}
      <section className="mx-auto max-w-3xl px-6 py-14 lg:px-8 lg:py-20">
        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-2 border-b border-gray-100 pb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-purple-100 bg-purple-50 px-3.5 py-1.5 text-xs font-semibold text-purple-600"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <article>
          {renderContent(blog.content)}
        </article>

        {/* Author Card */}
        <div className="mt-16 rounded-2xl border border-purple-100 bg-purple-50 p-6 sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white shadow-lg shadow-purple-200">
              {blog.author?.charAt(0)?.toUpperCase() ||
                "A"}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-purple-500">
                Written by
              </p>

              <p className="mt-1 text-lg font-bold text-gray-950">
                {blog.author}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Technology & business insights
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-gray-100 pt-8 sm:flex-row sm:items-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-purple-600"
          >
            <ArrowLeft size={16} />
            All articles
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition hover:text-purple-700"
          >
            Start a conversation
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-purple-600">
        <div className="pointer-events-none absolute -right-32 -top-40 h-[450px] w-[450px] rounded-full bg-purple-500/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-purple-700/50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-200">
              Build something better
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Have a project in mind?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-purple-100">
              Let&apos;s turn your idea into a powerful digital
              experience built around your business goals.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-purple-700 shadow-xl transition hover:bg-purple-50"
            >
              Get in touch
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}