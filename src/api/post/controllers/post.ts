/**
 * post controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::post.post",
  ({ strapi }) => ({
    async create(ctx) {
      const user = ctx.state.user; // Get the logged-in user from the request

      if (!user) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      // Add the authenticated user's ID to the request body
      ctx.request.body.data.loggedUserId = user.id;

      // Call the default create function with the modified request
      const response = await super.create(ctx);

      return response;
    },

    async publish(ctx) {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Post ID is required");
      }

      const user = ctx.state.user; // Get the logged-in user from the request

      if (!user || user?.role?.id != 3) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      const { query } = ctx;

      query.publicationState = "preview";
      const currentPost = await strapi.service("api::post.post").find({
        ...query,
        filters: {
          ...query.filters,
          id: id,
          author: ctx.state.user.id,
        },
      });

      if (currentPost.results.length == 0) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      try {
        ctx.request.body.data.isPublished = true;
        const updatedPost = await strapi.entityService.update(
          "api::post.post",
          id,
          {
            data: { publishedAt: new Date() }, // Publish the post
          }
        );

        ctx.body = updatedPost;
      } catch (error) {
        ctx.internalServerError("An error occurred while publishing the post");
      }
    },

    async unpublish(ctx) {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Post ID is required");
      }

      const user = ctx.state.user; // Get the logged-in user from the request

      if (!user || user?.role?.id != 3) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      const { query } = ctx;

      query.publicationState = "preview";
      const currentPost = await strapi.service("api::post.post").find({
        ...query,
        filters: {
          ...query.filters,
          id: id,
          author: ctx.state.user.id,
        },
      });

      if (currentPost.results.length == 0) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      try {
        ctx.request.body.data.isPublished = false;
        const updatedPost = await strapi.entityService.update(
          "api::post.post",
          id,
          {
            data: { publishedAt: null }, // Unpublish the post
          }
        );

        ctx.body = updatedPost;
      } catch (error) {
        ctx.internalServerError(
          "An error occurred while unpublishing the post"
        );
      }
    },

    async update(ctx) {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Post ID is required");
      }

      const user = ctx.state.user; // Get the logged-in user from the request

      if (!user || user?.role?.id != 3) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      const { query } = ctx;

      query.publicationState = "preview";
      const currentPost = await strapi.service("api::post.post").find({
        ...query,
        filters: {
          ...query.filters,
          id: id,
          author: ctx.state.user.id,
        },
      });

      if (currentPost.results.length == 0) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      // Call the default create function with the modified request
      const response = await super.update(ctx);

      return response;
    },

    async delete(ctx) {
      const { id } = ctx.params;

      if (!id) {
        return ctx.badRequest("Post ID is required");
      }

      const user = ctx.state.user; // Get the logged-in user from the request

      if (!user || user?.role?.id != 3) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      const { query } = ctx;

      query.publicationState = "preview";
      const currentPost = await strapi.service("api::post.post").find({
        ...query,
        filters: {
          ...query.filters,
          id: id,
          author: ctx.state.user.id,
        },
      });

      if (currentPost.results.length == 0) {
        return ctx.unauthorized("You do not have permission to do this action");
      }

      // Call the default create function with the modified request
      const response = await super.delete(ctx);

      return response;
    },

    // async find(ctx) {
    //   console.log(3);
    //   // inclucing all posts
    //   const { data, meta } = await super.find(ctx);
    //   if (!ctx.state.user) return { data, meta };
    //   console.log(1, ctx.state.user);
    //   return { data, meta };
    // },
    // http://localhost:1337/api/posts/?publicationState=preview
    // async find(ctx) {
    //   if (!ctx.state.user) return { ctx };
    //   const { query } = ctx;
    //   const authorPost = await strapi.service("api::post.post").find({
    //     ...query,
    //     filters: {
    //       ...query.filters,
    //       author: ctx.state.user.id,
    //     },
    //   });
    //   const sanitizedResults = await this.sanitizeOutput(authorPost, ctx);
    //   return this.transformResponse(sanitizedResults);
    // },
    // async find(ctx) {
    //   if (!ctx.state.user) return await super.find(ctx);
    //   const authorPost = await strapi
    //     .service("api::post.post")
    //     .findAuthorPost(ctx.query, ctx.state.user);
    //   const sanitizedResults = await this.sanitizeOutput(authorPost, ctx);
    //   return this.transformResponse(sanitizedResults);
    // },
  })
);
