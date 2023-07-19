const currentUser = async (parent, args, ctx, info) => {
  if (ctx.user) {
    const fullUserData = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.user.id,
      },
      select: {
        displayName: true,
        avatar: true,
      },
    });
    return fullUserData;
  }
  return null;
};

export default currentUser;
