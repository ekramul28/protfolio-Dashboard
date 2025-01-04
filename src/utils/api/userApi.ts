export async function isUserLoggedIn(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false; // If not in a browser, return false
  }
  const token = await localStorage.getItem("token");
  return !!token; // Returns true if token exists, otherwise false
}
