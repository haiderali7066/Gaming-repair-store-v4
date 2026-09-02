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
    <main className="min-h-screen bg-slate-50/50">
      {/* HERO - Rich Colored Background to Eliminate the "Too White" Look */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white">
        {/* Decorative ambient lighting glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-3.5 py-1.5 text-xs font-bold tracking-wide text-violet-300 backdrop-blur-md">
              <Sparkles size={14} />
              Insights & Resources
            </div>

            {/* Smaller, balanced heading size */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Ideas that help you{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-300">
                build what&apos;s next.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
              Explore practical insights, technology trends, business strategies, and expert guides designed to help you make better digital decisions.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles, topics, or keywords..."
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white shadow-inner backdrop-blur-xl outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      {!loading && featuredBlog && !search && activeCategory === "All" && (
        <section className="mx-auto max-w-7xl px-6 pt-12 pb-4 lg:px-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                Featured Article
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                Latest highlight
              </h2>
            </div>
          </div>

          <Link
            href={`/blog/${featuredBlog.slug}`}
            className="group grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md shadow-slate-100 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 lg:aspect-auto">
              {featuredBlog.coverImage ? (
                <img
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center bg-violet-50">
                  <Sparkles className="text-violet-300" size={40} />
                </div>
              )}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-violet-700 shadow-sm backdrop-blur-sm">
                  {featuredBlog.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 lg:p-8">
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <CalendarDays size={13} />
                  {formatDate(featuredBlog.publishedAt || featuredBlog.createdAt)}
                </span>
                <span>•</span>
                <span>{featuredBlog.author}</span>
              </div>

              <h3 className="mt-3 text-xl sm:text-2xl font-bold leading-snug text-slate-900 transition group-hover:text-violet-600">
                {featuredBlog.title}
              </h3>

              {featuredBlog.excerpt && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                  {featuredBlog.excerpt}
                </p>
              )}

              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-violet-600 transition group-hover:gap-2.5">
                Read featured article
                <ArrowRight size={15} />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* BLOG LIST SECTION */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* HEADER & CATEGORIES FILTER */}
          <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                Explore All
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                Articles & Guides
              </h2>
            </div>

            {/* Categories filter pills */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategory("All")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  activeCategory === "All"
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-600"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                    activeCategory === category
                      ? "bg-violet-600 text-white shadow-sm shadow-violet-500/25"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:text-violet-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* LOADING SKELETON */}
          {loading && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                >
                  <div className="aspect-[16/10] animate-pulse bg-slate-100" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                    <div className="h-5 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CARDS GRID */}
          {!loading && filteredBlogs.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-500/5"
                >
                  <div>
                    {/* Image */}
                    <Link href={`/blog/${blog.slug}`} className="block overflow-hidden">
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                        {blog.coverImage ? (
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-violet-50">
                            <Sparkles size={30} className="text-violet-300" />
                          </div>
                        )}
                        <div className="absolute left-3.5 top-3.5">
                          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-violet-700 shadow-sm backdrop-blur-sm">
                            {blog.category}
                          </span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <CalendarDays size={12} />
                          {formatDate(blog.publishedAt || blog.createdAt)}
                        </span>
                        <span>•</span>
                        <span>{blog.author}</span>
                      </div>

                      <Link href={`/blog/${blog.slug}`} className="block">
                        <h3 className="mt-2.5 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition group-hover:text-violet-600">
                          {blog.title}
                        </h3>
                      </Link>

                      {blog.excerpt && (
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600">
                          {blog.excerpt}
                        </p>
                      )}

                      {blog.tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 rounded-lg bg-violet-50 px-2 py-0.5 text-[11px] font-semibold text-violet-600"
                            >
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-0">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-violet-600 transition group-hover:gap-2"
                    >
                      Read article
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && filteredBlogs.length === 0 && (
            <div className="rounded-2xl border border-dashed border-violet-200 bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-500 mb-3">
                <Search size={22} />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No articles found
              </h3>
              <p className="mx-auto mt-1 max-w-sm text-xs text-slate-500">
                Try searching for a different keyword or choose another category filter.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                className="mt-5 rounded-xl bg-violet-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-violet-500/20 transition hover:bg-violet-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-r from-violet-900 via-purple-900 to-indigo-950 text-white">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-300">
                Let&apos;s work together
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
                Have an idea worth building?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Tell us what you&apos;re working on and let&apos;s explore how technology can help move your business forward.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-violet-900 shadow-lg shadow-black/10 transition hover:bg-violet-50"
            >
              Start a conversation
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}