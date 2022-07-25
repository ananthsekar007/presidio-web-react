export const loadAuthToken = () => {
  let authToken = localStorage.getItem("authToken");

  if (authToken) return authToken;

  return null;
};

export const saveAuthToken = (authToken: string) => {
  try {
    localStorage.setItem("authToken", authToken);
  } catch (e) {}
};

export const saveUser = (user: string) => {
  try {
    localStorage.setItem("user", user);
  } catch (e) {}
};

export const loadUser = () => {
  let user = localStorage.getItem("user");

  if (user) return JSON.parse(user);
};

export const clearStorage = () => {
  try {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  } catch (e) {
    console.error(e);
  }
};
