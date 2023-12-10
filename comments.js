// create web server
var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var db = require("../models");
var helpers = require("../helpers/comments");

router.route("/")
    .get(helpers.getComments)
    .post(helpers.createComment);

router.route("/:commentId")
    .get(helpers.getComment)
    .put(helpers.updateComment)
    .delete(helpers.deleteComment);

module.exports = router;