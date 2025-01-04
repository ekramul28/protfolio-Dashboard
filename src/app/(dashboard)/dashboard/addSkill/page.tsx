/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";

const AddSkill = () => {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [skill2, setSkill2] = useState("");
  const [level2, setLevel2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [message2, setMessage2] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setMessage("");

    // Prepare the data to send
    const data = {
      name: skill,
      level,
    };

    try {
      setLoading(true);

      const response = await fetch(
        "https://protfolio-web-server-liart.vercel.app/skills",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify that we're sending JSON data
          },
          body: JSON.stringify(data), // Send the data as a JSON string
        }
      );

      // Check if the response status is OK (200-299)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setMessage("Skill added successfully!");
        setSkill("");
        setLevel("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to add skill.");
      }
    } catch (error: any) {
      setMessage(error.message || "An error occurred. Please try again.");
      console.error("Error adding skill:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmitLevel2 = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setMessage2("");

    // Prepare the data to send
    const data = {
      name: skill,
      level,
    };

    try {
      setLoading2(true);

      const response = await fetch(
        "https://protfolio-web-server-liart.vercel.app/level",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify that we're sending JSON data
          },
          body: JSON.stringify(data), // Send the data as a JSON string
        }
      );

      // Check if the response status is OK (200-299)
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setMessage2("Skill added successfully!");
        setSkill("");
        setLevel("");
      } else {
        const errorData = await response.json();
        setMessage2(errorData.message || "Failed to add skill.");
      }
    } catch (error: any) {
      setMessage2(error.message || "An error occurred. Please try again.");
      console.error("Error adding skill:", error);
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="md:flex gap-3">
      <div className="  p-6 bg-gray-50 rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Add Level1 Skill
        </h1>
        <p className="text-gray-600 text-center mt-2 mb-6">
          Add your skills along with your proficiency level to showcase your
          expertise.
        </p>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 bg-white p-4 rounded-lg shadow-md"
        >
          {/* Skill Name */}
          <div>
            <label
              htmlFor="skill"
              className="block text-sm font-medium text-gray-700"
            >
              Skill Name
            </label>
            <input
              type="text"
              id="skill"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter skill name (e.g., JavaScript)"
              required
            />
          </div>

          {/* Proficiency Level */}
          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Proficiency Level
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
              disabled={loading}
            >
              {loading ? "Adding Skill..." : "Add Skill"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <div
            className={`mt-4 p-2 text-center rounded ${
              message.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>

      <div className="  p-6 bg-gray-50 rounded-lg shadow-lg mt-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Add Level2 Skill
        </h1>
        <p className="text-gray-600 text-center mt-2 mb-6">
          Add your skills along with your proficiency level to showcase your
          expertise.
        </p>
        <form
          onSubmit={handleSubmitLevel2}
          className="grid grid-cols-1 gap-6 bg-white p-4 rounded-lg shadow-md"
        >
          {/* Skill Name */}
          <div>
            <label
              htmlFor="skill"
              className="block text-sm font-medium text-gray-700"
            >
              Skill Name
            </label>
            <input
              type="text"
              id="skill"
              value={skill2}
              onChange={(e) => setSkill2(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter skill name (e.g., JavaScript)"
              required
            />
          </div>

          {/* Proficiency Level */}
          <div>
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Proficiency Level
            </label>
            <select
              id="level"
              value={level2}
              onChange={(e) => setLevel2(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>
                Select level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                loading2
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
              disabled={loading2}
            >
              {loading2 ? "Adding Skill..." : "Add Skill"}
            </button>
          </div>
        </form>

        {/* Message */}
        {message2 && (
          <div
            className={`mt-4 p-2 text-center rounded ${
              message2.includes("success")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message2}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSkill;
