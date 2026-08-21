import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb"

import Blog from "@/models/Blog";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID",
        },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("GET BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID",
        },
        { status: 400 }
      );
    }

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

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

    const duplicateSlug = await Blog.findOne({
      slug: finalSlug,
      _id: { $ne: id },
    });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          success: false,
          message: "Another blog already uses this slug",
        },
        { status: 409 }
      );
    }

    const wasPublished = blog.status === "published";

    blog.title = title;
    blog.slug = finalSlug;
    blog.excerpt = excerpt || "";
    blog.content = content;
    blog.coverImage = coverImage || "";
    blog.category = category || "General";
    blog.tags = Array.isArray(tags) ? tags : [];
    blog.author = author || "Admin";
    blog.status = status || "draft";
    blog.seoTitle = seoTitle || title;
    blog.seoDescription = seoDescription || excerpt || "";

    if (status === "published" && !wasPublished) {
      blog.publishedAt = new Date();
    }

    if (status !== "published") {
      blog.publishedAt = undefined;
    }

    await blog.save();

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error: any) {
    console.error("UPDATE BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update blog",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid blog ID",
        },
        { status: 400 }
      );
    }

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE BLOG ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete blog",
      },
      { status: 500 }
    );
  }
}