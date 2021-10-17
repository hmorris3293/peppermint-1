const { prisma } = require("../../../prisma/prisma");

exports.Add = async (req, res) => {
  try {
    const { name, address, port, active } = req.body;
    const monitor = await prisma.monitor.create({
      data: {
        name,
        url: address,
        port: Number(port),
        Active: active,
        interval: 1,
        up: true
      },
    });
    
    res.status(200).json({ monitor, sucess: true });
  } catch (error) {
    console.log(error);
    res.json({ error, sucess: false });
  }
};
