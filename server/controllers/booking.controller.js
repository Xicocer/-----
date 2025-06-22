const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const createBooking = async (req, res) => {
  try {
    console.log('Создание бронирования с данными:', req.body);

    const { email, phone, name, zoneIds, startTime, endTime, date, visitors } = req.body;

    if (!email || !phone || !name || !zoneIds || !startTime || !endTime || !visitors) {
      return res.status(400).json({ error: 'Заполните все обязательные поля' });
    }

    if (!Array.isArray(zoneIds) || zoneIds.length === 0) {
      return res.status(400).json({ error: 'Выберите хотя бы одну зону' });
    }

    // Получаем выбранные зоны с локацией и ценами
    const zones = await prisma.zone.findMany({
      where: { id: { in: zoneIds.map(Number) } },
      include: { location: true }
    });

    if (zones.length === 0) {
      return res.status(400).json({ error: 'Зоны не найдены' });
    }

    // Проверяем, что все зоны принадлежат одной локации
    const locationIds = new Set(zones.map(z => z.locationId));
    if (locationIds.size > 1) {
      return res.status(400).json({ error: 'Все зоны должны быть из одной локации' });
    }

    const locationPrice = Number(zones[0].location.price);
    const zonesPrice = zones.reduce((sum, z) => sum + Number(z.price), 0);
    const total = locationPrice + zonesPrice;

    // Создаём бронирование
    const booking = await prisma.booking.create({
      data: {
        email,
        phone,
        name,
        startTime,
        endTime,
        visitors: Number(visitors),
        status: 'Обрабатывается',
        total,
        zones: {
          connect: zoneIds.map(id => ({ id: Number(id) }))
        },
        date,
      }
    });

    res.status(201).json(booking);

  } catch (error) {
    console.error('Ошибка при создании бронирования:', error);
    console.error('Ответ сервера:', error.response?.data);
    res.status(500).json({ error: 'Ошибка сервера при создании бронирования' });
  }
};

const getBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        skip,
        take: limit,
        orderBy: { startTime: 'asc' },
      }),
      prisma.booking.count(),
    ])

    res.status(200).json({
      success: true,
      data: bookings,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Ошибка при получении бронирований:', error)
    res.status(500).json({ error: 'Ошибка сервера при получении бронирований' })
  }
}

const getBookingsByZone = async (req, res) => {
  try {
    const { zoneId } = req.params;
    const bookings = await prisma.booking.findMany({
      where: { zoneId: Number(zoneId) },
      orderBy: { startTime: 'asc' },
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Ошибка при получении бронирований по зоне:', error);
    res.status(500).json({ error: 'Ошибка сервера при получении бронирований по зоне' });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Обрабатывается', 'Подтверждено', 'Отклонено'].includes(status)) {
      return res.status(400).json({ error: 'Неверный статус бронирования' });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: Number(id) },
      data: { status },
    });

    res.status(200).json(updatedBooking);
  } catch (error) {
    console.error('Ошибка при обновлении бронирования:', error);
    res.status(500).json({ error: 'Ошибка сервера при обновлении бронирования' });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: Number(id) },
    });

    if (!booking) {
      return res.status(404).json({ error: 'Бронирование не найдено' });
    }

    await prisma.booking.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Бронирование успешно удалено' });
  } catch (error) {
    console.error('Ошибка при удалении бронирования:', error);
    res.status(500).json({ error: 'Ошибка сервера при удалении бронирования' });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingsByZone,
  updateBooking,
  deleteBooking,
};