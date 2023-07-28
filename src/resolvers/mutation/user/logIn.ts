const logIn = async (parent, { email, password }, ctx, info) => {
  console.log("log in!");
  return email;
};

export default logIn;
