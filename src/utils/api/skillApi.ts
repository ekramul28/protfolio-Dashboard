export const fetchSkills = async () => {
  try {
    const level1Res = await fetch(
      "https://protfolio-server-dun.vercel.app/skills"
    );
    if (!level1Res.ok) {
      throw new Error(`HTTP error! status: ${level1Res.status}`);
    }
    const level1Skills = await level1Res.json();
    return level1Skills; // Returning the fetched data
  } catch (error) {
    console.error("Error fetching skills:", error);
    return []; // Return an empty array if there's an error
  }
};
