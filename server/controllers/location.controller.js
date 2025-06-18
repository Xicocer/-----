const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();
const path = require('path');

const createLocation = async (req, res) => {
    try{
        const { name, description, address } = req.body;

        if (!name || !description || !address) {
            return res.status(400).json({ error: 'Не все поля заполнены' });
        }

        const imageUrl = req.file ? `/uploads/locations/${req.file.filename}` : null;

        const newLocation = await prisma.location.create({
            data: {
                name,
                description,
                address,
                imageUrl
            }
        });

        res.status(201).json(newLocation);
    }catch (error) {

        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Локация с таким названием уже существует' });
         }

        console.error('Ошибка при создании локации:', error);
        res.status(500).json({ error: 'Ошибка при создании локации' });
    }
}

const getLocations = async (req, res) => {
  try {
    const locations = await prisma.Location.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.status(200).json(locations);
  } catch (error) {
    console.error('Ошибка при получении локаций:', error);
    res.status(500).json({ error: 'Ошибка при получении локаций' });
  }
};

const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;

        const location = await prisma.location.findUnique({
            where: { id: Number(id) }
        });

        if (!location) {
            return res.status(404).json({ error: 'Локация не найдена' });
        }

        await prisma.location.delete({
            where: { id: Number(id) }
        });

        res.status(200).json({ message: 'Локация успешно удалена' });
    } catch (error) {
        console.error('Ошибка при удалении локации:', error);
        res.status(500).json({ error: 'Ошибка при удалении локации' });
    }
}

const locationList = async (req, res) => {
    try{
        const { page = 1, limit = 5, type } = req.query
        const skip = (parseInt(page) - 1) * parseInt(limit)
        const take = parseInt(limit)

        const where = {}
        if (type) where.type = type

        const [locations, total] = await Promise.all([
            prisma.Location.findMany(),
            prisma.Location.count({ where })
        ])

        res.status(200).json({
            success: true,
            data: locations,
            meta: {
                total,
                page: parseInt(page),
                limit: take,
                totalPages: Math.ceil(total / take)
            }
        })
    }catch (error) {
        console.error('Ошибка получения списка локаций: ', error)
        res.status(500).json({
            success: false,
            massage: 'Ошибка получения списка локаций', 
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        })
    }
}

module.exports = {
    createLocation,
    getLocations,
    deleteLocation,
    locationList
};

