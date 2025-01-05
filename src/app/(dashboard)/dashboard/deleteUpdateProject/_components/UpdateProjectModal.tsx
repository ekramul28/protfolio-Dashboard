/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

interface UpdateProjectModalProps {
  project: any;
  onUpdate: (updatedProject: any) => void; // Add this prop
}

const UpdateProjectModal: React.FC<UpdateProjectModalProps> = ({
  project,
  onUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    startDate: project.startDate
      ? new Date(project.startDate).toISOString().split("T")[0]
      : "",
    endDate: project.endDate
      ? new Date(project.endDate).toISOString().split("T")[0]
      : "",
    frontend: project.frontend.join(", "),
    backend: project.backend.join(", "),
    image: project.image.join(", "),
    githubFrontend: project.links?.githubFrontend || "",
    githubBackend: project.links?.githubBackend || "",
    liveDemo: project.links?.liveDemo || "",
    watchVideo: project.links?.watchVideo || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://protfolio-server-dun.vercel.app/projects/${project._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            frontend: formData.frontend
              .split(",")
              .map((tech: any) => tech.trim()),
            backend: formData.backend
              .split(",")
              .map((tech: any) => tech.trim()),
            image: formData.image.split(",").map((url: any) => url.trim()),
            links: {
              githubFrontend: formData.githubFrontend,
              githubBackend: formData.githubBackend,
              liveDemo: formData.liveDemo,
              watchVideo: formData.watchVideo,
            },
          }),
        }
      );

      if (response.ok) {
        const updatedProject = await response.json();
        console.log("Updated Project:", updatedProject);
        onUpdate(updatedProject);
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Error updating project:", errorData);
        alert(
          `Failed to update project: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred while updating the project. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-yellow-500 text-white text-sm font-medium rounded hover:bg-yellow-600"
      >
        Update
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 overflow-auto h-[calc(100vh-20px)] rounded shadow-lg w-full max-w-md"
          >
            <h3 className="text-xl font-semibold mb-4">Update Project</h3>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Start Date */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="startDate"
              >
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="endDate"
              >
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Frontend Technologies */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="frontend"
              >
                Frontend Technologies (comma-separated)
              </label>
              <input
                id="frontend"
                name="frontend"
                type="text"
                value={formData.frontend}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Backend Technologies */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="backend"
              >
                Backend Technologies (comma-separated)
              </label>
              <input
                id="backend"
                name="backend"
                type="text"
                value={formData.backend}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Image URLs */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="image">
                Image URLs (comma-separated)
              </label>
              <input
                id="image"
                name="image"
                type="text"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* GitHub Frontend URL */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="githubFrontend"
              >
                GitHub Frontend URL
              </label>
              <input
                id="githubFrontend"
                name="githubFrontend"
                type="text"
                value={formData.githubFrontend}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* GitHub Backend URL */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="githubBackend"
              >
                GitHub Backend URL
              </label>
              <input
                id="githubBackend"
                name="githubBackend"
                type="text"
                value={formData.githubBackend}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Live Demo URL */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="liveDemo"
              >
                Live Demo URL
              </label>
              <input
                id="liveDemo"
                name="liveDemo"
                type="text"
                value={formData.liveDemo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Watch Video URL */}
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="watchVideo"
              >
                Watch Video URL
              </label>
              <input
                id="watchVideo"
                name="watchVideo"
                type="text"
                value={formData.watchVideo}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 text-sm font-medium rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProjectModal;
