"use strict";

const fp = require("fastify-plugin");

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.addHook("onRequest", async function (request) {
    if (request.ip === "211.133.33.113") throw fastify.httpErrors.forbidden();
  });
});
