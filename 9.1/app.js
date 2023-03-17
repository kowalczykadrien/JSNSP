"use strict";
const express = require("express");
const app = express();
const router = express.Router();
const { PORT = 3000 } = process.env;

function convert(name) {
  const parts = name.split(" ");
  const first = parts.shift();
  const last = parts.pop();
  return {
    first: first,
    last: last,
  };
}

router.get("/", (req, res, next) => {
  setTimeout(() => {
    if (!req.query.un) {
      const err = new Error("Bad Request");
      err.statusCode = 400;
      next(err);
      return;
    } else {
      if (Array.isArray(req.query.un)) {
        res.send(req.query.un.map(convert));
      } else {
        res.send(req.query.un.toUpperCase());
      }
    }
  }, 1000);
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
