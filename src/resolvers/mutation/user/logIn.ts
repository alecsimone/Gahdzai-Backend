import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SuccessMessage } from "../../../resolvers-types.js";
import { maxAge } from "../../../utils/user/globalConstants.js";

const logIn = async (
  parent,
  { email, password },
  ctx,
  info
): Promise<SuccessMessage> => {
  const user = await ctx.prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Incorrect email or password",
    };
  }

  const correctPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, correctPassword);

  if (passwordsMatch) {
    const newUserToken = jwt.sign(user.id, process.env.APP_SECRET);
    ctx.res.cookie("userToken", newUserToken, {
      httpOnly: true,
      maxAge,
      domain: process.env.DOMAIN,
      sameSite: "Strict",
    });
    return {
      success: true,
      message: "Successfully logged in.",
    };
  }

  return {
    success: false,
    message: "Incorrect email or password",
  };
};

export default logIn;
