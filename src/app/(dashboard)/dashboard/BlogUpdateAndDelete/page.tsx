/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { fetchBlog } from "@/utils/api/blogApi";
import dynamic from "next/dynamic";

// Dynamically import BlogList with SSR disabled
const BlogList = dynamic(() => import("./_components/blogList"), {
  ssr: false,
});

const BlogUpDe: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        setLoading(true);
        const fetchedBlogs = await fetchBlog();
        setBlogs(fetchedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError(
          "An error occurred while fetching blogs. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default BlogUpDe;
