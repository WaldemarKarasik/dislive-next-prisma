// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const nc = require("next-connect");
const middleware = require("../../middlewares");
const handler = nc();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    res.send("ok");
  } catch (e) {
    return res.json(e.message);
  }
});

module.exports = handler;
