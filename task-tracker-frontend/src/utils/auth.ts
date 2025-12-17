export const saveAuthData = (token: string) => {
  localStorage.setItem("token", token);
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  console.log("Checking authentication status", localStorage.getItem("token"));
  return !!localStorage.getItem("token");
};
