const PrismaClient = require("@prisma/client").PrismaClient;
const nc = require("next-connect");
const handler = nc();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

handler.post(async (req, res) => {
  const { email, username, password } = req.body;
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findOne({ where: { email } });
    if (user) {
      throw new Error("Email занят");
    }
    const hashedPass = await bcryptjs.hash(password, 10);
    const userToSendToFrontend = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPass,
      },
    });
    const hashedEmail = await jwt.sign(
      { sub: userToSendToFrontend.email },
      "komsomolradio"
    );
    return res.json(userToSendToFrontend);
  } catch (e) {
    return res.status(500).json(e.message);
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = handler;
