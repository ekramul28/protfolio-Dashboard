"use client";
import React, { useState } from "react";
import BlogEditor from "../../addBlog/_components/blogEditor";
import Image from "next/image";

interface Blog {
  _id: string;
  content: string;
  title: string;
  imageUrl: string;
}

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs: initialBlogs }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [editingTitle, setEditingTitle] = useState("");
  const [editingImageUrl, setEditingImageUrl] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(
        `https://protfolio-server-dun.vercel.app/blogs/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the blog");
      }

      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== _id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  const handleEdit = (_id: string) => {
    const blogToEdit = blogs.find((blog) => blog._id === _id);
    if (blogToEdit) {
      setEditingBlogId(_id);
      setEditingContent(blogToEdit.content);
      setEditingTitle(blogToEdit.title);
      setEditingImageUrl(blogToEdit.imageUrl);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateBlog = async (
    content: string,
    title: string,
    imageUrl: string
  ) => {
    if (!editingBlogId) return;

    try {
      const response = await fetch(
        `https://protfolio-server-dun.vercel.app/blogs/${editingBlogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content, title, imageUrl }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the blog");
      }

      const updatedBlog = await response.json();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === editingBlogId
            ? { ...blog, content: updatedBlog.content, title, imageUrl }
            : blog
        )
      );

      setEditingBlogId(null);
      setEditingContent("");
      setEditingTitle("");
      setEditingImageUrl("");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update the blog. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded p-4 shadow bg-gray-100 space-y-2"
            >
              <Image
                height={200}
                width={200}
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {blog.title}
              </h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    blog?.content?.length > 150
                      ? `${blog?.content?.slice(0, 150)}...`
                      : blog.content,
                }}
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="px-3 py-1 text-sm text-blue-600 border rounded hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteBlogId(blog._id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="px-3 py-1 text-sm text-red-600 border rounded hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs yet.</p>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center   bg-black bg-opacity-50">
          <div className="bg-white h-[calc(100%-40px)] p-6 rounded-lg w-11/12 max-w-2xl overflow-auto   shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Blog</h3>
            <BlogEditor
              onSave={handleUpdateBlog}
              initialContent={editingContent}
              initialTitle={editingTitle}
              initialImageUrl={editingImageUrl}
              blogId={editingBlogId}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-sm shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this blog?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteBlogId && handleDelete(deleteBlogId)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
