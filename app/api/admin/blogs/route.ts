import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"

import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectToDatabase();

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();

    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      author,
      status,
      seoTitle,
      seoDescription,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and content are required",
        },
        { status: 400 }
      );
    }

    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const existingBlog = await Blog.findOne({
      slug: finalSlug,
    });

    if (existingBlog) {
      return NextResponse.json(
        {
          success: false,
          message: "A blog with this slug already exists",
        },
        { status: 409 }
      );
    }

    const blog = await Blog.create({
      title,
      slug: finalSlug,
      excerpt: excerpt || "",
      content,
      coverImage: coverImage || "",
      category: category || "General",
      tags: Array.isArray(tags) ? tags : [],
      author: author || "Admin",
      status: status || "draft",
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || excerpt || "",
      publishedAt:
        status === "published" ? new Date() : undefined,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        blog,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("CREATE BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create blog",
      },
      { status: 500 }
    );
  }
}