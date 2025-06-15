const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const createBooking = async (req, res) => {
  try {
    const { email, phone, name, zoneId, startTime, endTime, visitors } = req.body;

    if (!email || !phone || !name || !zoneId || !startTime || !endTime || !visitors) {
      return res.status(400).json({ error: 'Заполните все обязательные поля' });
    }

    const booking = await prisma.booking.create({
      data: {
        email,
        phone,
        name,
        zoneId: Number(zoneId),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        visitors: Number(visitors),
        status: 'Обрабатывается', 
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error('Ошибка при создании бронирования:', error);
    res.status(500).json({ error: 'Ошибка сервера при создании бронирования' });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { startTime: 'asc' },
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Ошибка при получении бронирований:', error);
    res.status(500).json({ error: 'Ошибка сервера при получении бронирований' });
  }
};

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