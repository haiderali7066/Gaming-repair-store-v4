import { cache } from "react";
import { connectToDatabase } from "@/lib/mongodb";
import BlogModel from "@/models/Blog";

export interface Blog {
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

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// cache() dedupes the query between generateMetadata and the page component
export const getBlogBySlug = cache(
  async (slug: string): Promise<Blog | null> => {
    await connectToDatabase();

    const doc = await BlogModel.findOne({
      slug: safeDecode(slug),
      status: "published",
    }).lean();

    if (!doc) return null;

    // Convert ObjectId and Date values into plain JSON-safe strings
    return JSON.parse(JSON.stringify(doc)) as Blog;
  },
);