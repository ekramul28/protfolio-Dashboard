/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchSkillsLevel2 } from "@/utils/api/level2SkillApi";
import { fetchSkills } from "@/utils/api/skillApi";
import React from "react";
import SkillsList from "./_components/SkillList";

const Skills = async () => {
  const level1Skills = await fetchSkills();
  const level2Skills = await fetchSkillsLevel2();

  return (
    <section id="skill" className="w-full py-6 md:py-16">
      <div className=" mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Update & Delete Your Skills
        </h2>

        {/* Level 1 Skills */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Level 1 Skills</h3>
          <SkillsList skills={level1Skills} level={1} />
        </div>

        {/* Level 2 Skills */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">Level 2 Skills</h3>
          <SkillsList skills={level2Skills} level={2} />
        </div>
      </div>
    </section>
  );
};

export default Skills;
