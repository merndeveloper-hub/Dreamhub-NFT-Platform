const Joi = require("joi");
const { find,updateDocument } = require("../../../helpers");

const removeData = async (req, res) => {
  try {
    const { nftId, ownerId, contract, nftType, listingId } = req.body;

    const nftData = await find("nft", { _id: nftId });
    if (!nftData) {
      return res.status(400).send({ status: 400, message: "No NFT Fund" });
    }

    const multipleData = await find("multipleUser", {
      nftId: nftId,
      ownerId: ownerId,
      listingId: listingId,
    });
    if (!multipleData) {
      return res
        .status(400)
        .send({ status: 400, message: "No multipleData Found" });
    }


//!==================================================ERC721==========================

    if (contract === "ERC721") {
      //!===============================================SELL
      if(nftType === "sell") {

          const removeNftData = await updateDocument(
            "nft",
            { _id: nftId, nftType: "sell", listingid: listingId },
            {
              nftType: "mint",
    
              actualPrice: null,
              listingid: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
        
          const removeMultipleData = await updateDocument(
            "multipleUser",
            {
              nftId: nftId,
              ownerId: ownerId,
              listingId: listingId,
              nftType: "sell",
            },
            {
              nftType: "mint",
              price: null,
              listingId: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
      return res.json({status:200, msg:"Data Updated Successfullly"})    
      }

      //!===============================================BID

      if(nftType === "bid") {

          const removeDataNftBid = await updateDocument(
            "nft",
            { _id: nftId, nftType: "bid", listingid: listingId },
            {
              nftType: "mint",
    
              actualPrice: null,
              bidGap: null,
              startDate: null,
              endDate: null,
              listingid: null,
              minimumBid: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
          
    
          const removeMultipleDataNftBid = await updateDocument(
            "multipleUser",
            {
              nftId: nftId,
              ownerId: ownerId,
              listingId: listingId,
              nftType: "bid",
            },
            {
              nftType: "mint",
              price: null,
              listingId: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
          return res.json({status:200, msg:"Data Updated Successfullly"}) 
      }

    //!===============================================AUCTION

    if(nftType === "auction") {

        const removeDataNftAuction = await updateDocument(
          "nft",
          { _id: nftId, nftType: "auction", listingid: listingId },
          {
            nftType: "mint",
          
            bidGap: null,
            startDate: null,
            endDate: null,
            listingid: null,
            minimumBid: null,
            sellnftnumber: null,
            createdAt: null,
            updatedAt: null,
          }
        );
        
  
        const removeMultipleDataNftAuction = await updateDocument(
          "multipleUser",
          {
            nftId: nftId,
            ownerId: ownerId,
            listingId: listingId,
            nftType: "auction",
          },
          {
            nftType: "mint",
            listingId: null,
            endDate:null,
            startDate:null,
            sellnftnumber: null,
            swapnftnumber: null,
            createdAt: null,
            updatedAt: null,
          }
        );
        return res.json({status:200, msg:"Data Updated Successfullly"}) 
    }
    }


//!==================================================ERC1155==========================

    if (contract === "ERC1155") {
      //!===============================================SELL
      if(nftType === "sell") {

          const removeNftData = await updateDocument(
            "nft",
            { _id: nftId, nftType: "sell", listingid: listingId },
            {
              nftType: "mint",
    
              actualPrice: null,
              listingid: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
        
          const removeMultipleData = await updateDocument(
            "multipleUser",
            {
              nftId: nftId,
              ownerId: ownerId,
              listingId: listingId,
              nftType: "sell",
            },
            {
              nftType: "mint",
              price: null,
              listingId: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
      return res.json({status:200, msg:"Data Updated Successfullly"})    
      }

      //!===============================================BID

      if(nftType === "bid") {

          const removeDataNftBid = await updateDocument(
            "nft",
            { _id: nftId, nftType: "bid", listingid: listingId },
            {
              nftType: "mint",
    
              actualPrice: null,
              bidGap: null,
              startDate: null,
              endDate: null,
              listingid: null,
              minimumBid: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
          
    
          const removeMultipleDataNftBid = await updateDocument(
            "multipleUser",
            {
              nftId: nftId,
              ownerId: ownerId,
              listingId: listingId,
              nftType: "bid",
            },
            {
              nftType: "mint",
              price: null,
              listingId: null,
              sellnftnumber: null,
              swapnftnumber: null,
              createdAt: null,
              updatedAt: null,
            }
          );
          return res.json({status:200, msg:"Data Updated Successfullly"}) 
      }

    //!===============================================AUCTION

    if(nftType === "auction") {

        const removeDataNftAuction = await updateDocument(
          "nft",
          { _id: nftId, nftType: "auction", listingid: listingId },
          {
            nftType: "mint",
          
            bidGap: null,
            startDate: null,
            endDate: null,
            listingid: null,
            minimumBid: null,
            sellnftnumber: null,
            createdAt: null,
            updatedAt: null,
          }
        );
        
  
        const removeMultipleDataNftAuction = await updateDocument(
          "multipleUser",
          {
            nftId: nftId,
            ownerId: ownerId,
            listingId: listingId,
            nftType: "auction",
          },
          {
            nftType: "mint",
            listingId: null,
            endDate:null,
            startDate:null,
            sellnftnumber: null,
            swapnftnumber: null,
            createdAt: null,
            updatedAt: null,
          }
        );
        return res.json({status:200, msg:"Data Updated Successfullly"}) 
    }
    }

  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = removeData;
