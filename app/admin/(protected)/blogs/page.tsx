"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  status: "draft" | "published";
  createdAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const deleteBlog = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setDeleting(id);

      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to delete blog");
        return;
      }

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Blogs
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage your website blogs.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          + Create Blog
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading blogs...
          </div>
        ) : blogs.length === 0 ? (
          <div className="p-12 text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              No blogs yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Create your first blog post.
            </p>

            <Link
              href="/admin/blogs/new"
              className="mt-5 inline-block rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
            >
              Create Blog
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Blog
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Author
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {blog.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          /{blog.slug}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {blog.category}
                    </td>

                    <td className="px-6 py-5 text-sm text-gray-600">
                      {blog.author}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          blog.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/blogs/${blog._id}/edit`}
                          className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteBlog(blog._id)}
                          disabled={deleting === blog._id}
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deleting === blog._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}