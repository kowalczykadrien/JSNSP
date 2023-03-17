"use strict";
const { promisify } = require("util");
const { boat } = require("../../model");
const read = promisify(boat.read);

module.exports = async function (fastify, opts) {
  fastify.get("/:id", async function (request, reply) {
    const err = fastify.httpErrors;
    const { id } = request.params;
    try {
      return await read(id);
    } catch (error) {
      if (error.message === "not found") throw err.notFound();
      throw error;
    }
  });
};
