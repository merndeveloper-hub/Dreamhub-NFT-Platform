const express = require("express");
const getSwapNft = require("./getSwap");
const swapNft = require("./swap");

const router = express.Router();

router.post("/swapnft", swapNft);
router.get("/get-swap-nfts", getSwapNft);

module.exports = router;
