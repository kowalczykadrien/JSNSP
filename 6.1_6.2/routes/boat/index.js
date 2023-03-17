"use strict";
const { promisify } = require("util");
const { boat } = require("../../model");
const read = promisify(boat.read);
const create = promisify(boat.create);
const del = promisify(boat.del);

module.exports = async function (fastify, opts) {
  const err = fastify.httpErrors;
  fastify.get("/:id", async function (request, reply) {
    const { id } = request.params;
    try {
      return await read(id);
    } catch (error) {
      if (error.message === "not found") throw err.notFound();
      throw error;
    }
  });

  fastify.post("/", async function (request, reply) {
    const { data } = request.body;
    try {
      reply.code(201);
      return await create(data);
    } catch (error) {
      throw error;
    }
  });

  fastify.delete("/:id", async function (request, reply) {
    const { id } = request.params;
    try {
      reply.code(204);
      return await del(id);
    } catch (error) {
      if (!error.message) throw err.internalServerError();
      if (error.message === "not found") throw err.notFound();
      throw error;
    }
  });
};
