import User from '../models/user';

export const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    addUser: async (_: any, { name, email, password }: any) => {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    },
  },
};
