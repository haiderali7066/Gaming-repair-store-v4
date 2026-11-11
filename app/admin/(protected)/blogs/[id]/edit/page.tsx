"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      {children}
    </div>
  )
}

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
  })

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/admin/blogs/${id}`)
        const data = await res.json()

        if (!data.success) {
          alert(data.message || "Blog not found")
          router.push("/admin/blogs")
          return
        }

        const blog = data.blog

        setForm({
          title: blog.title || "",
          slug: blog.slug || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          coverImage: blog.coverImage || "",
          category: blog.category || "General",
          tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
          author: blog.author || "Admin",
          status: blog.status || "draft",
          seoTitle: blog.seoTitle || "",
          seoDescription: blog.seoDescription || "",
        })
      } catch (error) {
        console.error(error)
        alert("Failed to load blog")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id, router])

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSaving(true)

      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      })

      const data = await res.json()

      if (!data.success) {
        alert(data.message || "Failed to update blog")
        return
      }

      router.push("/admin/blogs")
      router.refresh()
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-gray-500">Loading blog...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Blog</h1>
        <p className="mt-1 text-sm text-gray-500">Update your blog post.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl space-y-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">Basic Information</h2>

          <div className="space-y-5">
            <Field label="Title *">
              <input
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className={inputClass}
              />
            </Field>

            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Excerpt">
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                rows={3}
                className={inputClass}
              />
            </Field>

            <Field label="Content *">
              <textarea
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                required
                rows={20}
                className={`${inputClass} font-mono text-sm`}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">Blog Details</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Category">
              <input
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Author">
              <input
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="Tags">
              <input
                value={form.tags}
                onChange={(e) => updateField("tags", e.target.value)}
                placeholder="seo, marketing, business"
                className={inputClass}
              />
            </Field>

            <Field label="Status">
              <select
                value={form.status}
                onChange={(e) => updateField("status", e.target.value)}
                className={inputClass}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Cover Image URL">
              <input
                value={form.coverImage}
                onChange={(e) => updateField("coverImage", e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold">SEO</h2>

          <div className="space-y-5">
            <Field label="SEO Title">
              <input
                value={form.seoTitle}
                onChange={(e) => updateField("seoTitle", e.target.value)}
                className={inputClass}
              />
            </Field>

            <Field label="SEO Description">
              <textarea
                value={form.seoDescription}
                onChange={(e) => updateField("seoDescription", e.target.value)}
                rows={4}
                className={inputClass}
              />
            </Field>
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
            disabled={saving}
            className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  )
}