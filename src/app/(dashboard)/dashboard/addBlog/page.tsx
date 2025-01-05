import React from "react";
import BlogSection from "./_components/blogSection";

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-8">Blog Section</h1>
      <BlogSection />
    </div>
  );
};

export default BlogPage;
