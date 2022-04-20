const Route = require("express").Router();
const { index, post, show, update, destroy } = require("./controller");
const validation = require("./validation");

Route.get("/", index);
Route.post("/", validation, post);
Route.get("/:id", show);
Route.put("/:id", update);
Route.delete("/:id", destroy);

module.exports = Route;
