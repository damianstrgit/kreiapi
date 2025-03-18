import { Strapi } from "@strapi/strapi";
import { Context } from "koa";

export default {
  async authorRegister(ctx: Context) {
    try {
      const { email, password, username, name, role } = ctx.request.body;

      // Validate input
      if (!email || !password || !username || !name) {
        return ctx.badRequest("Missing required fields");
      }

      // Check if user already exists
      const existingUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { email },
        });

      if (existingUser) {
        return ctx.badRequest("User with this email already exists");
      }

      const existingUserName = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { username },
        });

      if (existingUserName) {
        return ctx.badRequest("User with this username already exists");
      }

      // Find the role (e.g., "Author")
      const authorRole = await strapi
        .query("plugin::users-permissions.role")
        .findOne({
          where: { name: "Author" }, // Replace "Author" with your role's name
        });

      if (!authorRole) {
        return ctx.badRequest("Role not found");
      }

      // Create the user with the role
      const newUser = await strapi.plugins[
        "users-permissions"
      ].services.user.add({
        email,
        password,
        username,
        name,
        confirmed: true, // Adjust based on your requirements
        blocked: false,
        provider: "local",
        role: authorRole.id,
      });

      return ctx.send({
        message: "User registered successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Error during author registration:", error);
      return ctx.internalServerError("An error occurred");
    }
  },
};
