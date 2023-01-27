// Token
export const tokenStorage = () => {
  try {
    return localStorage.getItem("TOKEN");
  } catch {
    return null;
  }
};
