"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import UpdateProjectModal from "./UpdateProjectModal";
import DeleteProjectModal from "./DeleteProjectModal";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  image: string[];
  title: string;
  description: string;
  frontend: string[];
  backend: string[];
  links: {
    githubFrontend?: string;
    githubBackend?: string;
    liveDemo?: string;
    watchVideo?: string;
  };
}

interface ProjectCartProps {
  projects: Project[];
}

const ProjectCart: React.FC<ProjectCartProps> = ({
  projects: initialProjects,
}) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleDelete = (id: string) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== id)
    );
  };

  const handleUpdateProject = (updatedProject: any) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === updatedProject._id ? updatedProject : project
      )
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects?.map((project, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-evenly my-2">
            {/* Update Button */}
            <UpdateProjectModal
              project={project}
              onUpdate={handleUpdateProject}
            />

            {/* Delete Button */}
            <DeleteProjectModal
              projectId={project._id}
              onDelete={handleDelete}
            />
          </div>
          <Image
            height={1000}
            width={1000}
            src={project.image[0]}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {project.description.length > 100
                ? `${project.description.slice(0, 100)}...`
                : project.description}
            </p>
            <div className="mb-2">
              <h4 className="text-sm font-semibold text-gray-700">
                Frontend Technologies:
              </h4>
              <p className="text-sm text-gray-600">
                {project.frontend.join(", ")}
              </p>
            </div>
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700">
                Backend Technologies:
              </h4>
              <p className="text-sm text-gray-600">
                {project.backend.join(", ")}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.links.githubFrontend && (
                <a
                  href={project.links.githubFrontend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
                >
                  GitHub Frontend
                </a>
              )}
              {project.links.githubBackend && (
                <a
                  href={project.links.githubBackend}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600"
                >
                  GitHub Backend
                </a>
              )}
              {project.links.liveDemo && (
                <a
                  href={project.links.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-500 text-white text-sm font-medium rounded hover:bg-purple-600"
                >
                  Live Demo
                </a>
              )}
              {project.links.watchVideo && (
                <a
                  href={project.links.watchVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600"
                >
                  Watch Video
                </a>
              )}
              <Link href={`/projectDetails/${project._id}`}>
                <p className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600">
                  Details
                </p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCart;
