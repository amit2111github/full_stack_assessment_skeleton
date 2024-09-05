const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.getAllUser = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.json({ data: users });
  } catch (err) {
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching users' });
  }
};

exports.getAllUserForHome = async (req, res) => {
  try {
    const { homeId } = req.params;
    const users = await prisma.user_interest.findMany({
      where: { home_id: Number(homeId) },
      select: { user: true },
    });
    const allUser = await prisma.user.findMany();
    const ids = users.map(({ user }) => user.id);
    const data = allUser.map((user) => ({
      ...user,
      intrested: ids.includes(user.id),
    }));
    return res.json({ data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
};
