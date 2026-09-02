import axios from "axios";

export const authService = {
  async register(email, password) {
    try {
      const response = await axios.post(
        "http://192.168.56.102:5000/api/auth/register",
        {
          email,
          password,
        },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  },

  async login(email, password) {
    try {
      const response = await axios.post(
        "http://192.168.56.102:5000/api/auth/login",
        {
          email,
          password,
        },
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      // throw error.response?.data?.message || "Login failed";
      throw error;
    }
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },
};
