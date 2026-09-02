import axios from "axios";

export const reservationService = {
  async postReservation(userId, studioId, price, startTime, endTime) {
    try {
      const res = await axios.post(
        "http://192.168.56.102:5000/api/reservation",
        {
          userId,
          studioId,
          price,
          startTime,
          endTime,
        },
      );
      return res.data;
    } catch (err) {
      throw err.response?.data?.message || "Failed to make a reservation";
    }
  },
  async getReservations(studioId) {
    const res = await axios.get(
      `http://192.168.56.102:5000/api/reservation/${studioId}`,
    );
    return res.data;
  },
};
