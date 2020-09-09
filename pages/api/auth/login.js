const PrismaClient = require("@prisma/client").PrismaClient;
const nc = require("next-connect");
const handler = nc();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { parseCookies, setCookie, destroyCookie } = require("nookies");
handler.post(async (req, res) => {
  const { email, password } = req.body;
  const prisma = new PrismaClient();
  try {
    const userExists = await prisma.user.findOne({
      where: { email },
      include: { Channel: true },
    });
    if (!userExists) {
      throw new Error("Некорректные данные");
    }
    const passwordIsMatch = await bcryptjs.compare(
      password,
      userExists.password
    );
    if (!passwordIsMatch) {
      throw new Error("Некорректные данные");
    }
    const hashedEmail = await jwt.sign(
      { sub: userExists.email },
      "komsomolradio"
    );

    return res.json({user: userExists, hashedEmail});
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

module.exports = handler;
