const prisma = require("../utils/prisma.js");

const reservation = async (req, res) => {
  try {
    const { userId, studioId, price, startTime, endTime } = req.body;

    if (!userId || !studioId || price == null || !startTime || !endTime) {
      return res.status(400).json({
        message: `Please provide all required fields ${req}`,
      });
    }

    const conflictingReservation = await prisma.reservation.findFirst({
      where: {
        studioId,
        AND: [
          { startTime: { lt: new Date(endTime) } },
          { endTime: { gt: new Date(startTime) } },
        ],
      },
    });

    if (conflictingReservation) {
      return res.status(400).json({
        message: "Studio is already booked in this time range",
      });
    }

    await prisma.reservation.create({
      data: {
        userId,
        studioId,
        price,
        startTime,
        endTime,
      },
    });
    res.status(201).json({
      message: "Studio booked successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to make a reservation" });
  }
};

const getReservations = async (req, res) => {
  const { studioId } = req.params;

  try {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const reservations = await prisma.reservation.findMany({
      where: {
        studioId: Number(studioId),
        startTime: { gte: today },
        endTime: { lte: nextWeek },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });
    res.status(200).json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch reservations" });
  }
};
module.exports = { reservation, getReservations };
