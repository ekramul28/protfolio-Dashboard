/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";

interface Skill {
  id: string;
  name: string;
  level: string;
}

interface SkillsListProps {
  skills: Skill[];
  level: number;
}

const SkillsList: React.FC<SkillsListProps> = ({ skills, level }) => {
  const [skillList, setSkillList] = useState(skills);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null);

  // Open the update modal
  const openUpdateModal = (skill: Skill) => {
    setCurrentSkill(skill);
    setUpdateModalOpen(true);
  };

  // Open the delete modal
  const openDeleteModal = (skill: Skill) => {
    setCurrentSkill(skill);
    setDeleteModalOpen(true);
  };

  // Handle update skill
  const handleUpdateSkill = async (updatedSkill: Skill) => {
    const res = await fetch(
      `https://protfolio-web-server-liart.vercel.app/skills/${updatedSkill?.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill: updatedSkill, level }),
      }
    );

    console.log(res.json());

    // Update local state
    setSkillList((prev) =>
      prev.map((s) => (s.id === updatedSkill.id ? updatedSkill : s))
    );

    setUpdateModalOpen(false);
    setCurrentSkill(null);
  };

  // Handle delete skill
  const handleDeleteSkill = async () => {
    if (currentSkill) {
      await fetch(`https://protfolio-web-server-liart.vercel.app/skills`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillId: currentSkill.id, level }),
      });

      // Update local state
      setSkillList((prev) => prev.filter((s) => s.id !== currentSkill.id));
    }

    setDeleteModalOpen(false);
    setCurrentSkill(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillList.map((skill) => (
          <div
            key={skill.id}
            className="flex items-center justify-between gap-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition duration-300"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {skill.name}
              </h3>
              <p className="text-sm text-gray-600">{skill.level}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => openUpdateModal(skill)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => openDeleteModal(skill)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {isUpdateModalOpen && currentSkill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Skill</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updatedSkill = {
                  ...currentSkill,
                  name: (e.target as any)["name"].value,
                  level: (e.target as HTMLFormElement)["level"].value,
                };
                handleUpdateSkill(updatedSkill);
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Skill Name
                </label>
                <input
                  name="name"
                  defaultValue={currentSkill.name}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Skill Level
                </label>
                <select
                  name="level"
                  defaultValue={currentSkill.level}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                >
                  <option value="" disabled>
                    Select level
                  </option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setUpdateModalOpen(false)}
                  className="px-3 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && currentSkill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Delete Skill</h3>
            <p className="mb-6">
              Are you sure you want to delete the skill{" "}
              <span className="font-bold">{currentSkill.name}</span>?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                No
              </button>
              <button
                onClick={handleDeleteSkill}
                className="px-3 py-2 bg-red-500 text-white rounded-lg"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
