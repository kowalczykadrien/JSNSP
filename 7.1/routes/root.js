"use strict";

const got = require("got");
const { BOAT_SERVICE_PORT, BRAND_SERVICE_PORT } = process.env;
const boatSrv = `http://localhost:${BOAT_SERVICE_PORT}`;
const brandSrv = `http://localhost:${BRAND_SERVICE_PORT}`;

module.exports = async function (fastify, opts) {
  fastify.get("/:id", async function (request, reply) {
    const { id } = request.params;
    const err = fastify.httpErrors;
    try {
      const boat = await got(`${boatSrv}/${id}`, {
        timeout: 150,
      }).json();
      const brand = await got(`${brandSrv}/${boat.brand}`, {
        timeout: 150,
      }).json();
      return {
        id: boat.id,
        color: boat.color,
        brand: brand.name,
      };
    } catch (error) {
      if (!error.response) throw err.notFound();
      if (error.response.statusCode === 500) throw err.badRequest();
      if (error.response.statusCode === 404) throw err.notFound();
      throw error;
    }
  });
};
