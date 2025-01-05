import React from "react";
import { fetchProjects } from "@/utils/api/projectApi";

import ProjectCart from "./_components/projectCart";

const Projects = async () => {
  const projects = await fetchProjects();

  return (
    <section id="project" className="w-full py-6 md:py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Manage Projects</h2>

        <ProjectCart projects={projects} />
      </div>
    </section>
  );
};

export default Projects;
