"use client";
import React from "react";
// import BlogEditor from "./_components/blogEditor";
import dynamic from "next/dynamic";

const BlogPage: React.FC = () => {
  // Dynamically import the BlogEditor component and disable SSR
  const BlogEditor = dynamic(() => import("./_components/blogEditor"), {
    ssr: false, // This disables SSR for this component
  });
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold text-center py-8">Blog Section</h1>
      <BlogEditor />
    </div>
  );
};

export default BlogPage;
