const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllHomeForUser = async (req, res) => {
  try {
    const pageSize = 50;
    const page = Number(req.query.page || 1);
    console.log(page);
    const skip = (page - 1) * pageSize;
    const { userId } = req.params;
    const homes = await prisma.user_interest.findMany({
      where: { user_id: Number(userId) },
      select: { home: true },
      skip,
      take: Number(pageSize),
    });
    console.log(homes.length);
    return res.json({ data: homes });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const { homeId, userIds } = req.body;
    if (!Array.isArray(userIds) || userIds.length == 0) {
      return res
        .status(400)
        .json({ error: 'interested user for home can not be empty' });
    }
    await prisma.$transaction(async (prisma) => {
      // old intrested users
      const intrestedUsers = await prisma.user_interest.findMany({
        where: { home_id: Number(homeId) },
        select: {
          user: {
            select: {
              id: true,
            },
          },
        },
      });
      const existedIds = intrestedUsers.map((user) => user.user.id);
      const userToRemove = existedIds.filter((id) => !userIds.includes(id));
      const usertoAdd = userIds.filter((id) => !existedIds.includes(id));

      if (usertoAdd.length > 0) {
        await prisma.user_interest.createMany({
          data: usertoAdd.map((userId) => ({
            user_id: Number(userId),
            home_id: Number(homeId),
          })),
        });
      }
      if (userToRemove.length > 0) {
        await prisma.user_interest.deleteMany({
          where: {
            home_id: Number(homeId),
            user_id: { in: userToRemove },
          },
        });
      }
    });

    return res.json({ message: 'User interests updated successfully.' });
  } catch (err) {
    console.log(err);
  }
};
