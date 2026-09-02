import axios from "axios";

export const studiosService = {
  async getAllStudios() {
    try {
      const res = await axios.get("http://192.168.56.102:5000/api/studios");
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Failed to fetch studios";
    }
  },

  async getStudioById(studioId) {
    try {
      const res = await axios.get(
        `http://192.168.56.102:5000/api/studios/${studioId}`,
      );
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Failed to fetch studio by id";
    }
  },
};
