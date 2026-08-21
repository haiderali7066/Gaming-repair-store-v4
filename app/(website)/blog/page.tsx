"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt?: string;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();

        if (data.success) {
          setBlogs(data.blogs);
          setFilteredBlogs(data.blogs);

          const uniqueCategories = Array.from(
            new Set(
              data.blogs
                .map((blog: Blog) => blog.category)
                .filter(Boolean)
            )
          ) as string[];

          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    let result = [...blogs];

    if (activeCategory !== "All") {
      result = result.filter(
        (blog) => blog.category === activeCategory
      );
    }

    if (search.trim()) {
      const searchTerm = search.toLowerCase();

      result = result.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm) ||
          blog.excerpt?.toLowerCase().includes(searchTerm) ||
          blog.category?.toLowerCase().includes(searchTerm) ||
          blog.tags?.some((tag) =>
            tag.toLowerCase().includes(searchTerm)
          )
      );
    }

    setFilteredBlogs(result);
  }, [blogs, activeCategory, search]);

  const formatDate = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const featuredBlog = blogs[0];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-purple-100 bg-white">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-purple-50 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
              <Sparkles size={15} />
              Insights & Resources
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-7xl lg:leading-[1.05]">
              Ideas that help you
              <span className="block text-purple-600">
                build what&apos;s next.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-600 lg:text-xl">
              Explore practical insights, technology trends,
              business strategies, and expert guides designed
              to help you make better digital decisions.
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-2xl">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, topics, or keywords..."
                className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-13 pr-5 text-sm text-gray-900 shadow-lg shadow-purple-100/40 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-100"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {!loading && featuredBlog && !search && activeCategory === "All" && (
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
                Featured
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-950 sm:text-3xl">
                Latest from our blog
              </h2>
            </div>

            <Link
              href="/blog"
              className="hidden items-center gap-2 text-sm font-semibold text-purple-600 transition hover:text-purple-700 sm:flex"
            >
              Explore all
              <ArrowRight size={16} />
            </Link>
          </div>

          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl shadow-purple-100/40 transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-100 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-purple-50 lg:aspect-auto">
              {featuredBlog.coverImage ? (
                <img
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center bg-purple-50">
                  <Sparkles className="text-purple-300" size={45} />
                </div>
              )}

              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-purple-700 shadow-md">
                  {featuredBlog.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  {formatDate(
                    featuredBlog.publishedAt ||
                      featuredBlog.createdAt
                  )}
                </span>

                <span>{featuredBlog.author}</span>
              </div>

              <h2 className="mt-5 text-3xl font-bold leading-tight text-gray-950 transition group-hover:text-purple-600 sm:text-4xl">
                {featuredBlog.title}
              </h2>

              {featuredBlog.excerpt && (
                <p className="mt-5 line-clamp-3 text-base leading-7 text-gray-600">
                  {featuredBlog.excerpt}
                </p>
              )}

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition group-hover:gap-3">
                Read featured article
                <ArrowRight size={17} />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* BLOG LIST */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          {/* HEADER */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-purple-600">
                Explore
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-950">
                All articles
              </h2>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === "All"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:text-purple-600"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() =>
                    setActiveCategory(category)
                  }
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeCategory === category
                      ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-purple-200 hover:text-purple-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                >
                  <div className="aspect-[16/10] animate-pulse bg-gray-100" />

                  <div className="space-y-4 p-6">
                    <div className="h-4 w-20 animate-pulse rounded bg-gray-100" />
                    <div className="h-6 w-full animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-gray-100" />
                    <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CARDS */}
          {!loading && filteredBlogs.length > 0 && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50"
                >
                  {/* Image */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="block overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-purple-50">
                      {blog.coverImage ? (
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Sparkles
                            size={35}
                            className="text-purple-300"
                          />
                        </div>
                      )}

                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-purple-700 shadow-sm">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        {formatDate(
                          blog.publishedAt ||
                            blog.createdAt
                        )}
                      </span>

                      <span>{blog.author}</span>
                    </div>

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="block"
                    >
                      <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-7 text-gray-950 transition group-hover:text-purple-600">
                        {blog.title}
                      </h3>
                    </Link>

                    {blog.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                        {blog.excerpt}
                      </p>
                    )}

                    {blog.tags?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {blog.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-600"
                          >
                            <Tag size={11} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/blog/${blog.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-purple-600 transition group-hover:gap-3"
                    >
                      Read article
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* EMPTY */}
          {!loading && filteredBlogs.length === 0 && (
            <div className="rounded-3xl border border-dashed border-purple-200 bg-white px-6 py-20 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50">
                <Search
                  size={24}
                  className="text-purple-500"
                />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-950">
                No articles found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                Try another keyword or choose a different
                category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-6 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-purple-600">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-purple-500/50 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-purple-700/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-widest text-purple-200">
                Let&apos;s work together
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Have an idea worth building?
              </h2>

              <p className="mt-4 text-base leading-7 text-purple-100">
                Tell us what you&apos;re working on and let&apos;s
                explore how technology can help move your
                business forward.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-purple-700 shadow-xl transition hover:bg-purple-50"
            >
              Start a conversation
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}