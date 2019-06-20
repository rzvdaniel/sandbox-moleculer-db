const ApiGateway = require("moleculer-web");

module.exports = {
  name: "api",
  mixins: [ApiGateway],

  // More info about settings: https://moleculer.services/docs/0.13/moleculer-web.html
  settings: {
    port: 8080,

    routes: [
      {
        path: "/api",

        mappingPolicy: "restrict",

        autoAliases: true,

        aliases: {
          // Users aliases
          "REST users": "users",

          // Articles aliases
          "PUT articles/:id/vote": "articles.vote",
          "PUT articles/:id/unvote": "articles.unvote",

          "REST articles": "articles"
        },
        
        bodyParsers: {
          json: { limit: "2MB" },
          urlencoded: { extended: true, limit: "2MB" }
        }
      },
    ],

    // Serve assets from "public" folder
    assets: {
      folder: "public"
    }
  }
};
