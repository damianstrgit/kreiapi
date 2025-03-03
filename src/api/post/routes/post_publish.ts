export default {
  routes: [
    {
      method: "PUT",
      path: "/posts/:id/publish",
      handler: "post.publish",
      config: {
        policies: [], // Add any policies if needed
      },
    },
    {
      method: "PUT",
      path: "/posts/:id/unpublish",
      handler: "post.unpublish",
      config: {
        policies: [], // Add any policies if needed
      },
    },
  ],
};
