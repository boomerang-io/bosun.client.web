import { Server, Serializer, Model } from "miragejs";
import { inflections } from "inflected";
import { serviceUrl } from "Config/servicesConfig";
import * as fixtures from "./fixtures";

export function startApiServer({ environment = "test", timing = 0 } = {}) {
  inflections("en", function (inflect) {
    // Prevent pluralization bc our apis are weird
    inflect.irregular("catalog", "catalog");
  });

  return new Server({
    environment,
    // Load in mock data
    fixtures,
    // Return the data as is, don't add a root key
    serializers: {
      application: Serializer.extend({
        root: false,
        embed: true,
      }),
      catalog: Serializer.extend({
        include: ["size"],
      }),
    },
    // Register the data as a model so we can use the schema
    models: {
      catalog: Model,
      teamDetails: Model,
    },

    routes() {
      // Control how long the responses take to resolve
      this.timing = timing;

      // Allow unhandled requests on the current domain to pass through
      this.passthrough();

      // this.get("/info", () => []);

      // /**
      //  * Simple GET of static data
      //  */
      // this.get(serviceUrl.getUserProfile(), (schema) => {
      //   return schema.db.profile[0];
      // });

      // this.get(serviceUrl.getNavigation(), (schema) => {
      //   return schema.db.navigation[0];
      // });

      // // this.get(serviceUrl.getServices({size:"1000"}), (schema, request) => {
      // //   return schema.db.catalog;
      // // });
      // // Need to find a way to read the size param
      // this.get("/api/catalog", (schema, request) => {
      //   return schema.db.catalog;
      // });

      // this.get(serviceUrl.getCategories(), (schema) => {
      //   // For some reason when we return usind schema.db it returns string as object
      //   return schema.db.categories[0].data;
      // });

      // this.get(serviceUrl.getAttributes(), (schema) => {
      //   // For some reason when we return usind schema.db it returns string as object
      //   return schema.db.attributes[0].data;
      // });

      // this.get(serviceUrl.getBundles(), (schema) => {
      //   // For some reason when we return usind schema.db it returns string as object
      //   return schema.db.bundles[0].data;
      // });

      // this.get(serviceUrl.getTeams(), (schema) => {
      //   return schema.db.userTeams;
      // });

      // /** Team details - Quick Add */
      // this.get(serviceUrl.getTeamDetail({ teamId: ":teamId" }), (schema, request) => {
      //   return schema.db.teamDetails[0];
      // });

      // /** Service details */
      // this.get(serviceUrl.getServiceDetails({ serviceId: ":serviceId" }), (schema, request) => {
      //   return schema.db.serviceDetails[0];
      // });

      // /** Service details - Get add teams */
      // this.get(serviceUrl.getAddServiceTeams({ serviceId: ":serviceId" }), (schema, request) => {
      //   return schema.db.addServiceTeams;
      // });

      // /**
      //  * Add service - Quick Add
      //  */

      // this.post(serviceUrl.postAddService(), (schema, request) => {
      //   return {};
      // });
    },
  });
}
