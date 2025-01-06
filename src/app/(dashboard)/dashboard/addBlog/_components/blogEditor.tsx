"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";
import Quill from "quill";

interface BlogEditorProps {
  onSave: (content: string, title: string, imageUrl: string) => void;
  initialContent?: string;
  initialTitle?: string;
  initialImageUrl?: string;
  blogId?: string | null;
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  onSave,
  initialContent = "",
  initialTitle = "",
  initialImageUrl = "",
  blogId,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const [title, setTitle] = useState(initialTitle);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  useEffect(() => {
    if (editorRef.current && !quill) {
      const instance = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write your blog here...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            ["blockquote", { list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      // Set the width and height of the Quill editor container
      instance.root.style.height = "400px";
      instance.root.style.width = "100%";

      // Set the initial content
      instance.root.innerHTML = initialContent;

      setQuill(instance);
    }
  }, [quill, initialContent]);

  const handleSave = async () => {
    const content = quill?.root.innerHTML || "";

    if (content.trim() && title.trim() && imageUrl.trim()) {
      try {
        const url = blogId
          ? `https://protfolio-server-dun.vercel.app/blogs/${blogId}` // Update the existing blog if blogId is provided
          : "https://protfolio-server-dun.vercel.app/blogs"; // Otherwise create a new blog

        const method = blogId ? "PUT" : "POST"; // Use PUT for update, POST for create

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, title, imageUrl }),
        });

        if (!response.ok) {
          throw new Error(
            blogId
              ? "Failed to update the blog"
              : "Failed to save the blog post"
          );
        }

        const responseData = await response.json();
        console.log(
          blogId ? "Blog updated successfully:" : "Blog saved successfully:",
          responseData
        );

        // Clear the editor after successful save
        if (quill) {
          quill.root.innerHTML = "";
        }
        setTitle("");
        setImageUrl("");
        onSave(content, title, imageUrl); // Trigger the onSave callback
      } catch (error) {
        console.error("Error saving/updating blog:", error);
        alert("Error saving/updating the blog. Please try again.");
      }
    } else {
      alert("Blog content, title, and image URL cannot be empty!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white shadow-lg rounded-lg ">
      <h2 className="text-2xl font-semibold text-gray-800">
        {blogId ? "Update Your Blog Post" : "Write Your Blog Post"}
      </h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="relative">
        <div
          ref={editorRef}
          className="border-2 border-gray-300 rounded-lg bg-white p-4"
        ></div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
        >
          {blogId ? "Update Blog" : "Save Blog"}
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
