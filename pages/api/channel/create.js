const PrismaClient = require("@prisma/client").PrismaClient;
const nc = require("next-connect");
const handler = nc();

handler.post(async (req, res) => {
  const prisma = new PrismaClient();
  const { userId, channelName } = req.body;
  try {
    const user = await prisma.user.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error("Пользователь не найден");
    }
    const channelExists = await prisma.channel.findOne({
      where: { name: channelName },
    });
    if (channelExists) {
      throw new Error("Канал с таким именем уже существует");
    }
    const createChannel = await prisma.channel.create({
      data: {
        name: channelName,
        user: {
          connect: { id: userId },
        },
      },
    });
    const userToSendToFrontend = await prisma.user.findOne({
      where: { id: userId.id },
      include: { Channel: true },
    });
    return res.json(userToSendToFrontend);
  } catch (e) {
    return res.status(500).json(e.message);
  } finally {
    await prisma.$disconnect;
  }
});

module.exports = handler;
