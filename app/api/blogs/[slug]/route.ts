import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Blog from "@/models/Blog";

interface RouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  request: Request,
  { params }: RouteContext
) {
  try {
    await connectToDatabase();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog slug is required",
        },
        {
          status: 400,
        }
      );
    }

    const blog = await Blog.findOne({
      slug: decodeURIComponent(slug),
      status: "published",
    }).lean();

    if (!blog) {
      return NextResponse.json(
        {
          success: false,
          message: "Blog not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    console.error("PUBLIC BLOG DETAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blog",
      },
      {
        status: 500,
      }
    );
  }
}
