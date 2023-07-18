const currentUser = async (parent, args, ctx, info) => {
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
};

export default currentUser;
