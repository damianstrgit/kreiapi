/**
 * post service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::post.post", ({ strapi }) => ({
  async findAuthorPost(args, user) {
    const newQuery = {
      ...args,
      filters: {
        ...args.filters,
        author: user.id,
      },
    };

    const authorPost = await strapi.entityService.findMany(
      "api::post.post",
      newQuery
    );

    return authorPost;
  },
}));
