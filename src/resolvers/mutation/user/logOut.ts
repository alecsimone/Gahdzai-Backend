const logOut = async (parent, args, ctx, info) => {
  ctx.res.clearCookie("userToken");

  return "logged out";
};

export default logOut;
