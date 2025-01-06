// pages/index.tsx or your Home component
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen  p-6">
      {/* Dashboard Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Track your progress, manage your projects, and share your blogs with
          the world!
        </p>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Skills Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Skills</h2>
          <p className="text-4xl font-bold text-blue-600">22</p>
          <p className="text-sm text-gray-500 mt-2">
            Expand your skill set to stay ahead!
          </p>
        </div>

        {/* Projects Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects</h2>
          <p className="text-4xl font-bold text-green-600">7</p>
          <p className="text-sm text-gray-500 mt-2">
            Keep building amazing things!
          </p>
        </div>

        {/* Blogs Card */}
        <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Blogs</h2>
          <p className="text-4xl font-bold text-red-600">1</p>
          <p className="text-sm text-gray-500 mt-2">
            Share your knowledge and experiences!
          </p>
        </div>
      </div>

      {/* Recent Activities and Actions */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Add Buttons */}
          <Link
            href={"/dashboard/addSkill"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Add New Skill
          </Link>
          <Link
            href={"/dashboard/addProject"}
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
          >
            Add New Project
          </Link>
          <Link
            href={"/dashboard/addBlog"}
            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700"
          >
            Write a Blog
          </Link>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-lg mt-6 p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Activities
          </h3>
          <ul className="text-gray-600 space-y-2">
            <li>📌 Added a new project: Dashboard Enhancement</li>
            <li>⭐ Mastered React Hook Form</li>
            <li>📝 Published a blog on Tailwind CSS Tips</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home;
