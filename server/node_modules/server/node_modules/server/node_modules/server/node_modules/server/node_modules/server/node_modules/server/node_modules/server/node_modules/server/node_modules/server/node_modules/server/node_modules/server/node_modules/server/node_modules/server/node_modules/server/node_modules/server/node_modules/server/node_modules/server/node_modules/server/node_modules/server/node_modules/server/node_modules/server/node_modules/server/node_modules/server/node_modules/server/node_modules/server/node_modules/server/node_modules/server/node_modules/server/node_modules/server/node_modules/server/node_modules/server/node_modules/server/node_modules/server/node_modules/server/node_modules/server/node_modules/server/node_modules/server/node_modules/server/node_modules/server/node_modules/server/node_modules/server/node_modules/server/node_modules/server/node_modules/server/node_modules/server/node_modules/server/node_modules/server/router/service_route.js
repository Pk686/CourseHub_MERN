const express = require("express");
const router = express.Router();
const service = require("../controllers/service-controller")

router.route("/services").get(service);

module.exports = router;