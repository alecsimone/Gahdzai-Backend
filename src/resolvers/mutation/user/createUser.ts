import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { maxAge } from "../../../utils/user/globalConstants.js";

const createUser = async (
  parent,
  { displayName, email, password },
  ctx,
  info
) => {
  const hash = await bcrypt.hash(password, 10);

  const user = await ctx.prisma.user.create({
    data: {
      displayName,
      email,
      password: hash,
    },
  });

  const newUserToken = jwt.sign(user.id, process.env.APP_SECRET);
  ctx.res.cookie("userToken", newUserToken, {
    httpOnly: true,
    maxAge,
    domain: process.env.DOMAIN,
    sameSite: "Strict",
  });

  return user;
};

export default createUser;
