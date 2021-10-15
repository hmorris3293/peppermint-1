const { prisma } = require("../../../prisma/prisma");

exports.Ping = async () => {
  try {
    const monitors = await prisma.monitor.findMany()
    
    console.log(monitors)
  } catch (error) {
    console.log(error);
    
  }
};
