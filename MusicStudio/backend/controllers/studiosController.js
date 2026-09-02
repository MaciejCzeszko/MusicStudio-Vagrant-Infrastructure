const prisma = require("../utils/prisma.js");

const getAllStudios = async (req, res) => {
  try {
    const studios = await prisma.studio.findMany();

    const studiosImages = studios.map((studio) => ({
      ...studio,
      imageUrl: `http://192.168.56.102:5000/uploads/${studio.imageUrl}`,
    }));

    res.json(studiosImages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch studios" });
  }
};

const getStudioById = async (req, res) => {
  try {
    const studioId = Number(req.params.id);

    if (isNaN(studioId)) {
      return res.status(400).json({ message: "Invalid studio id" });
    }

    const studio = await prisma.studio.findUnique({
      where: { id: studioId },
    });

    if (!studio) {
      return res.status(404).json({ message: "Studio not found" });
    }

    res.json(studio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch studio by id" });
  }
};
module.exports = { getAllStudios, getStudioById };
