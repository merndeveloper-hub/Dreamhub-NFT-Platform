const Joi = require("joi");
const { find, getAggregate } = require("../../../helpers");

const schema = Joi.object({
  nftType: Joi.string().valid("sell", "auction", "bid", "mint").required(),
});

const getAllNFTOnSell = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { nftType } = req.query;

    const sells = await getAggregate("nft", [
      {
        $match: {
          nftType: { $in: [nftType] },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerObject",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "creatorObject",
        },
      },
    ]);

    const sell = sells.slice(sells.length - 16,  sells.length);

    return res.status(200).send({ status: 200, sells: sell });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = getAllNFTOnSell;
