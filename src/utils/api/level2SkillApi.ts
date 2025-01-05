export const fetchSkillsLevel2 = async () => {
  try {
    const level2Res = await fetch(
      "https://protfolio-server-dun.vercel.app/level",
      {
        cache: "no-store", // Avoid caching for always fresh data
      }
    );
    console.log("level2", level2Res);
    if (!level2Res.ok) {
      throw new Error(`HTTP error! status: ${level2Res.status}`);
    }
    const level2Skills = await level2Res.json();
    return level2Skills; // Returning the fetched data
  } catch (error) {
    console.error("Error fetching skills:", error);
    return []; // Return an empty array if there's an error
  }
};
