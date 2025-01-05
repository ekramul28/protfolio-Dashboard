import React from "react";
import { fetchBlog } from "@/utils/api/blogApi";
import BlogList from "./_components/blogList";

const BlogUpDe = async () => {
  const blogs = await fetchBlog();

  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default BlogUpDe;
