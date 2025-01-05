"use client";
import React, { useState } from "react";
import BlogEditor from "../../addBlog/_components/blogEditor";

interface Blog {
  _id: string;
  content: string;
}

interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs: initialBlogs }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/blogs/${_id}`, {
        method: "DELETE",
      });

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
      setIsEditModalOpen(true);
    }
  };

  console.log(editingBlogId);

  const handleUpdateBlog = async (content: string) => {
    if (!editingBlogId) return;

    try {
      const response = await fetch(
        `http://localhost:5000/blogs/${editingBlogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the blog");
      }

      const updatedBlog = await response.json();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === editingBlogId
            ? { ...blog, content: updatedBlog.content }
            : blog
        )
      );

      setEditingBlogId(null);
      setEditingContent("");
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update the blog. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Blogs</h2>

      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded p-4 shadow bg-gray-100 space-y-2"
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Edit Blog</h3>
            <BlogEditor
              onSave={(content) => handleUpdateBlog(content)}
              initialContent={editingContent}
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
