/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { fetchBlog } from "@/utils/api/blogApi";
// import BlogList from "./_components/blogList";
import dynamic from "next/dynamic";

// Dynamically import BlogList with SSR disabled, ensuring it only runs on the client side
const BlogList = dynamic(() => import("./_components/blogList"), {
  ssr: false,
});
const BlogUpDe = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const getBlogs = async () => {
      const fetchedBlogs = await fetchBlog();
      setBlogs(fetchedBlogs);
    };
    getBlogs();
  }, []);
  console.log(blogs);
  return <div>{blogs.length === 1 && <BlogList blogs={blogs} />}</div>;
};

export default BlogUpDe;
