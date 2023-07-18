import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const getUserFromToken = async (token: string, prisma: PrismaClient) => {
  if (!token) return null;

  const id = jwt.verify(token, process.env.APP_SECRET) as string;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      role: true,
    },
  });

  return user;
};

export default getUserFromToken;
