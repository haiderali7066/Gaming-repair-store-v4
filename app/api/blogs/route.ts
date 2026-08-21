import { NextResponse } from "next/server";
import {connectToDatabase} from "@/lib/mongodb";
import Blog from "@/models/Blog";

export async function GET() {
  try {
    await connectToDatabase();

    const blogs = await Blog.find({
      status: "published",
    })
      .sort({ publishedAt: -1, createdAt: -1 })
      .select(
        "title slug excerpt coverImage category tags author publishedAt createdAt"
      )
      .lean();

    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error("PUBLIC BLOGS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      {
        status: 500,
      }
    );
  }
}