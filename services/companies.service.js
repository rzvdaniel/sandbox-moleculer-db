const DbService = require("moleculer-db");
const Fakerator = require("fakerator");
const fakerator = Fakerator();

module.exports = {
  name: "companies",

  mixins: [DbService],

  adapter: new DbService.MemoryAdapter(),

  settings: {
    // Available fields
    fields: ["_id", "name", "email", "phone", "website", "address", "created", "updated"]
  },

  actions: {
    list: {
      // Expose as "/companies/"
      rest: "GET /",
      handler(ctx) {
        let params = this.sanitizeParams(ctx, ctx.params);

				return this.adapter.find(params)
					.then(docs => this.transformDocuments(ctx, params, docs));
      }
    },

    get: {
      // Expose as "/companies/:id"
      rest: "GET /:id",
      handler(ctx) {
        return `GET company with Id = ${ctx.params.id}`;
      }
    },

    create: {
      // Expose as "/companies/"
      rest: "POST /",
      params: {
        name: { type: "string" }
      },
      handler(ctx) {
        return `CREATE company with name = ${ctx.params.name}`;
      }
    },

    update: {
      // Expose as "/companies/:id"
      rest: "PUT /:id",
      params: {
        name: { type: "string" }
      },
      handler(ctx) {
        return `UPDATE name of company with id = ${ctx.params.id}. New name: ${
          ctx.params.name
        }`;
      }
    },

    remove: {
      // Expose as "/companies/:id"
      rest: "DELETE /:id",
      handler(ctx) {
        return `DELETE uscompanyer with id = ${ctx.params.id}`;
      }
    }
  },

  methods: {
    /**
     * Seeding Users DB
     */
    async seedDB() {
      this.logger.info("Seed Companies database...");
      const fakeCompanies = fakerator.times(fakerator.entity.company, 10);
      const savedCompanies = await this.adapter.insertMany(fakeCompanies);
      this.logger.info(`Created ${savedCompanies.length} fake users.`, savedCompanies);
    }
  },

  /**
   * Service started lifecycle event handler
   */
  async started() {
    if ((await this.adapter.count()) === 0) {
      await this.seedDB();
    } else {
      this.logger.info(`DB contains ${await this.adapter.count()} companies.`);
    }
  },

  /**
   * Service stopped lifecycle event handler
   */
  stopped() {}
};
