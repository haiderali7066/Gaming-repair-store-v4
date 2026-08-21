"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "General",
    tags: "",
    author: "Admin",
    status: "draft",
    seoTitle: "",
    seoDescription: "",
  });

  const updateField = (
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateSlug = () => {
    const slug = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    updateField("slug", slug);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to create blog");
        return;
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Create Blog
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Create a new blog post for your website.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl space-y-6"
      >
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Basic Information
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Title *
              </label>

              <input
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
                required
                placeholder="Enter blog title"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <div className="flex gap-2">
                <input
                  value={form.slug}
                  onChange={(e) =>
                    updateField("slug", e.target.value)
                  }
                  placeholder="blog-url-slug"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />

                <button
                  type="button"
                  onClick={generateSlug}
                  className="rounded-lg border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Excerpt
              </label>

              <textarea
                value={form.excerpt}
                onChange={(e) =>
                  updateField("excerpt", e.target.value)
                }
                rows={3}
                placeholder="Short description of the blog..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Content *
              </label>

              <textarea
                value={form.content}
                onChange={(e) =>
                  updateField("content", e.target.value)
                }
                required
                rows={20}
                placeholder="Write your blog content here..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 font-mono text-sm outline-none focus:border-black"
              />

              <p className="mt-2 text-xs text-gray-400">
                You can later replace this textarea with a rich
                text editor such as Tiptap.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">
            Blog Details
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <input
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
                placeholder="SEO"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Author
              </label>

              <input
                value={form.author}
                onChange={(e) =>
                  updateField("author", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Tags
              </label>

              <input
                value={form.tags}
                onChange={(e) =>
                  updateField("tags", e.target.value)
                }
                placeholder="seo, marketing, business"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />

              <p className="mt-1 text-xs text-gray-400">
                Separate tags with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  updateField("status", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">
                  Published
                </option>
              </select>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Cover Image URL
            </label>

            <input
              value={form.coverImage}
              onChange={(e) =>
                updateField("coverImage", e.target.value)
              }
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">
            SEO
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                SEO Title
              </label>

              <input
                value={form.seoTitle}
                onChange={(e) =>
                  updateField("seoTitle", e.target.value)
                }
                placeholder="SEO optimized title"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                SEO Description
              </label>

              <textarea
                value={form.seoDescription}
                onChange={(e) =>
                  updateField(
                    "seoDescription",
                    e.target.value
                  )
                }
                rows={4}
                placeholder="SEO meta description..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}