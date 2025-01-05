"use client";
import React, { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      image: imageUrl,
      link,
      title,
      description,
    };

    console.log("Form data submitted:", formData);

    try {
      const response = await fetch(
        "https://protfolio-server-dun.vercel.app/blogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send the form data as JSON
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit blog post");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      // Show success message
      setSuccessMessage("Blog post submitted successfully!");

      // Reset form fields after successful submission
      setTitle("");
      setLink("");
      setDescription("");
      setImageUrl("");

      // Clear the success message after a timeout (optional)
      setTimeout(() => setSuccessMessage(""), 3000); // Clears message after 3 seconds
    } catch (error) {
      console.error("Error submitting blog post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg mt-14">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Add Your Blog
      </h1>
      <p className="text-gray-600 text-center mt-2 mb-6">
        Share your thoughts, ideas, and stories with the world. Fill out the
        form below to create a new blog post.
      </p>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 text-center rounded-lg">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-4 rounded-lg shadow-md"
      >
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Link */}
        <div>
          <label
            htmlFor="link"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Link
          </label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={4}
            required
          />
        </div>

        {/* Image URL Input */}
        <div className="md:col-span-2">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Blog Image URL
          </label>
          <div className="flex items-center">
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter image URL"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
