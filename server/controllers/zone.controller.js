const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const createZone = async (req, res) => {
  try {
    const { name, locationId, price } = req.body;

    if (!name || !locationId) {
      return res.status(400).json({ error: 'Не все поля заполнены' });
    }

    const location = await prisma.location.findUnique({
      where: { id: Number(locationId) },
    });

    if (!location) {
      return res.status(404).json({ error: 'Локация не найдена' });
    }

    const newZone = await prisma.zone.create({
      data: {
        name,
        price: parseFloat(price),
        locationId: Number(locationId),
      },
    });

    res.status(201).json(newZone);
  } catch (error) {
    console.error('Ошибка при создании зоны:', error);
    res.status(500).json({ error: 'Ошибка при создании зоны' });
  }
};

const getZonesByLocation = async (req, res) => {
  try {
    const locationId = Number(req.params.locationId);

    if (isNaN(locationId)) {
      return res.status(400).json({ error: 'Некорректный ID локации' });
    }

    const zones = await prisma.zone.findMany({
      where: { locationId },
    });

    res.status(200).json(zones);
  } catch (error) {
    console.error('Ошибка при получении зон:', error);
    res.status(500).json({ error: 'Ошибка при получении зон' });
  }
};

const deleteZone = async (req, res) => {
  try {
    const { id } = req.params;

    const zone = await prisma.zone.findUnique({
      where: { id: Number(id) },
    });

    if (!zone) {
      return res.status(404).json({ error: 'Зона не найдена' });
    }

    await prisma.zone.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Зона успешно удалена' });
  } catch (error) {
    console.error('Ошибка при удалении зоны:', error);
    res.status(500).json({ error: 'Ошибка при удалении зоны' });
  }
};

module.exports = {
  createZone,
  getZonesByLocation,
  deleteZone,
};