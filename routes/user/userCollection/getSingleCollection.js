const { find, getDataWithLimit } = require("../../../helpers");

const getSingleUserCollection = async (req, res) => {
  try {
    const { wallet_address } = req.body;

    console.log(wallet_address, "wallet_address");

    const nftCollection = await find("dhcontractcollection", {
      wallet_address: wallet_address, //uncomment by umer
      // userAddress: wallet_address,
    });
    if (nftCollection < 1) {
      return res.json({ status: 200, msg: "No Collection Found" });
    }

    const collection = await find("nftcollection", {
      wallet_address: wallet_address, //uncomment by umer
      // userAddress: wallet_address,
    });
    // if (collection < 1) {
    //   return res.json({ status: 200, msg: "No Collection Found" });
    // }

    let data = [...nftCollection, ...collection];

    const moralisData = data.map((obj) => {
      // console.log(obj,"obj");
      return find("nft", {
        // collectionContractAddress: obj.userAddress,
        collectionContractId: obj._id,
      }).then((nftObj) => {
        console.log(nftObj, "hello");
        return {
          ...obj._doc,
          nfts: nftObj,
        };
      });
    });

    const nftData = collection.map((obj) => {
      return find("nft", {
        collectionContractId: obj._id,
      }).then((nftObj) => {
        return {
          ...obj._doc,
          nfts: nftObj,
        };
      });
    });

    Promise.all(moralisData, nftData).then((values) => {
      return res.json({ status: 200, msg: values });
    });
  } catch (error) {
    //   console.log(error);
    return res.json({ status: 500, message: error.message });
  }
};

module.exports = getSingleUserCollection;
