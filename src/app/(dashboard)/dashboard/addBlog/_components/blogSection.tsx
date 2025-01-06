// components/BlogSection.tsx
"use client";
import React, { useState } from "react";
import BlogEditor from "./blogEditor";

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<{ id: number; content: string }[]>([]);

  const handleSaveBlog = (content: string) => {
    setBlogs([{ id: Date.now(), content }, ...blogs]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <BlogEditor onSave={handleSaveBlog} />
    </div>
  );
};

export default BlogSection;
