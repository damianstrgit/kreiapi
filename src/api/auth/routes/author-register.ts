export default {
  routes: [
    {
      method: "POST",
      path: "/auth/author-register",
      handler: "auth.authorRegister",
      config: {
        policies: [], // Add custom policies if needed
        middlewares: [],
      },
    },
  ],
};
