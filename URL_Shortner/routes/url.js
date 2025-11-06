const express = require("express");
const { handleGenerateNewShortURL } = require("../controllers/url");


const router = express.Router();

routes.post("/", handleGenerateNewShortURL);

module.exports = router;