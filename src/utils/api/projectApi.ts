// Define the function to fetch projects
export async function fetchProjects() {
  try {
    const res = await fetch(
      "https://protfolio-web-server-liart.vercel.app/projects",
      {
        cache: "no-store", // Avoid caching for always fresh data
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const projects = await res.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return []; // Return an empty array as a fallback
  }
}
export async function fetchSingleProjects(id: string) {
  try {
    const res = await fetch(
      `https://protfolio-web-server-liart.vercel.app/projects/${id}`,
      {
        cache: "no-store",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch project data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
