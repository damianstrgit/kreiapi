import { Strapi } from "@strapi/strapi";

export default {
  async beforeCreate(event: {
    params: { data: any; context: { state?: { user?: { id: number } } } };
  }) {
    const { params } = event;
    if (params.data.loggedUserId) {
      params.data.author = [params.data.loggedUserId];
    }
    params.data.publishedAt = null;
  },
  async beforeUpdate(event) {
    const { data } = event.params;

    if (data.isPublished === true) {
      data.publishedAt = new Date();
    } else if (data.isPublished === false) {
      data.publishedAt = null;
    }
  },
};
