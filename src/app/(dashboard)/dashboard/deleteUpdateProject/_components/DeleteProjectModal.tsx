"use client";

import React, { useState } from "react";

const DeleteProjectModal = ({
  projectId,
  onDelete,
}: {
  projectId: string;
  onDelete: (id: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://protfolio-server-dun.vercel.app/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        onDelete(projectId); // Update the UI by removing the project
        setIsOpen(false); // Close the modal
      } else {
        const errorData = await response.json();
        console.error("Error deleting project:", errorData);
        alert(
          `Failed to delete project: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error during deletion:", error);
      alert("An error occurred while deleting the project. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
      >
        Delete
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to delete this project?
            </h3>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteProjectModal;
