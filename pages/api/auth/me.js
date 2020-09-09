const PrismaClient = require("@prisma/client").PrismaClient;
const nc = require("next-connect");
const handler = nc();
const jwt = require("jsonwebtoken");
import { parseCookies, setCookie } from "nookies";

handler.get(async (req, res) => {
  const cookies = parseCookies({ req });
  const prisma = new PrismaClient();
  try {
    if (!cookies.user) {
      throw new Error("Нет печеньки");
    }
    const { sub } = await jwt.verify(cookies.user, "komsomolradio");
    const user = await prisma.user.findOne({
      where: { email: sub },
      include: { Channel: true },
    });

    if (!user) {
      throw new Error("Пользователь не найден");
    }
    return res.json({ ok: true, user });
  } catch (e) {
    return res.status(500).json(e.message);
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = handler;
