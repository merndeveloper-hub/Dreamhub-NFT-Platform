const Joi = require("joi");

const {
    deleteManyDocument,
    updateDocument,
    findOne,
    insertNewDocument,
} = require("../../../helpers");
const { ObjectID } = require("../../../types");

// 
const acceptSwapOffer = async (req, res) => {
    try {

        const {
            _id,
            bidder_id, // bidder user id
            owner_id, // owner user id
            nftContractAddressToSwapWith,  // bidder nft contract address
            nftContractAddress, // owner nft contract address
            ownernft_id, // owenr nft id
            biddernft_id, // owenr nft id
            //winner, // default
            chain,  // same both nft
            makerAddress, // owner wallet address
            takerAddress, // bidder wallet address
            tokenId, // owner nft token id
            tokenIdToSwapWith, // bidder nft token id
            amount, // total supply nft amount owner
            amountToSwapWith  // total supply nft amount bidder
        } = req.body;


        const updateOwner = (ownerArr) => {
            let arr = ownerArr.map((a) => {
                return a.toString()
            })

            console.log(arr, 'foundddddddddd')
            let indexFound = arr.indexOf(owner_id)
            console.log(indexFound, owner_id, 'foundddddddddd')
            if (indexFound >= 0) {
                console.log('foundddddddddd')
                arr.splice(indexFound, 1, bidder_id)
            }
            return arr
        }

        const updateOwner2 = (ownerArr) => {
            let arr = ownerArr.map((a) => {
                return a.toString()
            })

            console.log(arr, 'foundddddddddd')
            let indexFound = arr.indexOf(bidder_id)
            console.log(indexFound, owner_id, 'foundddddddddd')
            if (indexFound >= 0) {
                console.log('foundddddddddd')
                arr.splice(indexFound, 1, owner_id)
            }
            return arr
        }

        const nftForSwap = await findOne("nft", { //konsi nft swap hogi
            tokenAddress: nftContractAddress,
            nft_tokenId: tokenId
        });

        let ownerArr = nftForSwap.owner

        let nftForSwapObj = {
            ...nftForSwap._doc,
            owner: updateOwner(ownerArr),
            swapnftnumber: 0,
            nftType: 'mint'
        }

        // console.log(nftForSwapObj, "nftForSwapObj");



        const nftSwapWith = await findOne("nft", { //kis nft se swap hogi
            tokenAddress: nftContractAddressToSwapWith,
            nft_tokenId: tokenIdToSwapWith
        });

        let ownerArr2 = nftSwapWith.owner


        let nftSwapWithObj = {
            ...nftSwapWith._doc,
            owner: updateOwner2(ownerArr2),
            swapnftnumber: 0,
            nftType: 'mint'
        }

        // console.log(nftSwapWithObj, "nftSwapWithObj");

        const check_bid = await findOne("swapbid", {
            _id: _id,
            bidder_id,
        });

        // return res
        //     .status(200)
        //     .send({
        //         status: 200,
        //         nftForSwap: nftForSwap,
        //         nftForSwapObj: nftForSwapObj,
        //         ownerArr: ownerArr,
        //         nftSwapWith: nftSwapWith,
        //         nftSwapWithObj: nftSwapWithObj,
        //         ownerArr2: ownerArr2,
        //         message: "Bid accepted successfully"
        //     });


        if (!check_bid) {
            return res.status(404).send({ status: 404, message: "no bid found" });
        }


        // const getSingleNft = await findOne('nft', {
        //     tokenAddress: nftContractAddressToSwapWith,
        //     nft_tokenId: tokenIdToSwapWith
        // })

        // return res
        //     .status(200)
        //     .send({ status: 200, getSingleNft, message: "Bid accepted successfully" });




        const updateNftSwapWith = await updateDocument(
            "nft",
            {
                tokenAddress: nftContractAddressToSwapWith,
                nft_tokenId: tokenIdToSwapWith
            },
            {
                //     owner: nftSwapWithObj.owner,
                //     swapnftnumber :nftSwapWithObj.swapnftnumber,
                //    nftType:nftSwapWithObj.nftType
                ...nftSwapWithObj

            }
        );

        console.log(updateNftSwapWith, "updateNftSwapWith");

        const updateNftForSwap = await updateDocument(
            "nft",
            {
                tokenAddress: nftContractAddress,
                nft_tokenId: tokenId
            },
            {
                // owner: nftForSwapObj.owner,
                //  swapnftnumber :nftForSwapObj.swapnftnumber,
                // nftType:nftForSwapObj.nftType
                ...nftForSwapObj
            }
        );

        const MultipleNftForSwap = await findOne(
            "multipleUser",
            {
                nftId: ownernft_id
            }
        );

        let MultipleNftForSwapObj = {
            ...MultipleNftForSwap._doc,
            swapnftnumber: "0",
            nftType: 'mint',
            ownerId: bidder_id

        }


        const MultipleNftWithSwap = await findOne(
            "multipleUser",
            {
                nftId: biddernft_id
            }
        );

        let MultipleNftWithSwapObj = {
            ...MultipleNftWithSwap._doc,
            swapnftnumber: "0",
            nftType: 'mint',
            ownerId: owner_id

        }

        // return res
        //     .status(200)
        //     .send({
        //         status: 200,
        //         MultipleNftForSwapObj: MultipleNftForSwapObj,
        //         MultipleNftWithSwapObj: MultipleNftWithSwapObj,
        //         message: "swap offer accepted successfully"
        //     });

        console.log(updateNftForSwap, "updateNftForSwap");
        const updateMultipleNftForSwap = await updateDocument(
            "multipleUser",
            {
                nftId: ownernft_id
            },
            {
                ...MultipleNftForSwapObj
            }
        );

        console.log(updateNftForSwap, "updateNftForSwap");
        const updateMultipleNftWithSwap = await updateDocument(
            "multipleUser",
            {
                nftId: biddernft_id
            },
            {
                ...MultipleNftWithSwapObj
            }
        );



        const deleteBids = await deleteManyDocument("swapbid", {
            nft_id: check_bid.nft_id,
        });

        // //history should be maintain

        const history = await insertNewDocument("history", {
            nft_id: check_bid.nft_id,
            action: "offer accepted",
            from: req.userId,
            price: check_bid.bid_price,
            to: bidder_id,
        });
//        req.io.emit(check_bid?.nft_id.valueOf() + "acceptbid", { bid: [] });

        return res
            .status(200)
            .send({
                status: 200,
                nft: {
                    nftForSwap: { ...nftForSwapObj },
                    nftWithSwap: { ...nftSwapWithObj }
                },
                multipleUser:{
                    nftForSwap:{...MultipleNftForSwapObj},
                    nftWithSwap:{...MultipleNftWithSwapObj}
                },
                message: "swap offer accepted successfully"
            });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ status: 500, message: e.message });
    }
};

module.exports = acceptSwapOffer;


// // before
// {
//     "_id": {
//       "$oid": "6412ad957d7871bfd4787436"
//     },
//     "title": "capmannnnnnn",
//     "description": "dsadas",
//     "nftImg": "http://res.cloudinary.com/softsyncdev/image/upload/v1678945669/huwd0kbglg3duci2cyb4.webp",
//     "royality": "10",
//     "size": "sm",
//     "nft_tokenId": "79",
//     "abstraction": "Art",
//     "created_by": {
//       "$oid": "6380b0e1d3363c97c366a091"
//     },
//     "owner": [
//       {
//         "$oid": "6380b0e1d3363c97c366a091"
//       }
//     ],
//     "tokenAddress": "0x42C59753000a121e8B3e2ab817D13804Ed5dB9A2",
//     "nft_chain_id": "5",
//     "nftType": "swap",
//     "contract": "ERC1155",
//     "totalSupply": 10,
//     "ownerSupplies": [],
//     "createdAt": {
//       "$date": {
//         "$numberLong": "1678945685424"
//       }
//     },
//     "updatedAt": {
//       "$date": {
//         "$numberLong": "1678945713253"
//       }
//     },
//     "__v": 0,
//     "events": {
//       "_BuyMarketItem": [
//         null
//       ]
//     },
//     "remainingSupply": 10,
//     "sellnftnumber": 0,
//     "swapnftnumber": "10"
//   }

// {
//     "_id": "6412adf77d7871bfd4787471",
//     "nft_id": "6412adf77d7871bfd478746d",
//     "bidder_id": "63ff1aca07ec245b6fd62c40",
//     "nftContractAddressToSwapWith": "0x42C59753000a121e8B3e2ab817D13804Ed5dB9A2",
//     "nftContractAddress": "0x42C59753000a121e8B3e2ab817D13804Ed5dB9A2",
//     "ownernft_id": "6412ad957d7871bfd4787436",
//     "chain": "5",
//     "makerAddress": "0xd82c4119294f3350939eeb2d1c74a84618a06a9f",
//     "takerAddress": "0xf78197ae3a1879A58233fDB0A32CfF953db3bD33",
//     "tokenId": "79",
//     "tokenIdToSwapWith": "34",
//     "amount": "10",
//     "amountToSwapWith": "1",
//     "createdAt": "2023-03-16T05:49:43.564Z",
//     "updatedAt": "2023-03-16T05:49:43.564Z",
//     "__v": 0,
//     "bidderObject": [
//         {
//             "_id": "63ff1aca07ec245b6fd62c40",
//             "username": "0xf78197ae3a1879a58233fdb0a32cff953db3bd33",
//             "full_Name": "Unnamed",
//             "bio": "I just love NFTs and that's the reason I joined this cool Marketplace. Looking forward to engaging with all of you guys. Cheers!",
//             "status": "Active",
//             "type": "627a6a099f91d59b26d0d2aa",
//             "followers": [],
//             "following": [],
//             "created_date": "2023-03-01T09:28:42.924Z",
//             "createdAt": "2023-03-01T09:28:42.925Z",
//             "updatedAt": "2023-03-01T09:28:42.925Z",
//             "__v": 0
//         }
//     ],
//     "nftObject": [
//         {
//             "_id": "6412adf77d7871bfd478746d",
//             "title": "dsadas",
//             "description": "casdas",
//             "nftImg": "http://res.cloudinary.com/softsyncdev/image/upload/v1677735805/d5yclh52oejhhpwigw6m.webp",
//             "royality": "0",
//             "nft_tokenId": "34",
//             "owner": [
//                 "63ff1aca07ec245b6fd62c40"
//             ],
//             "tokenAddress": "0x42c59753000a121e8b3e2ab817d13804ed5db9a2",
//             "nft_chain_id": "5",
//             "nftType": "mint",
//             "tokenHash": "0cc5e15023724b14c9d508fadda973d4",
//             "ownerSupplies": [],
//             "createdAt": "2023-03-16T05:49:43.392Z",
//             "updatedAt": "2023-03-16T05:49:43.392Z",
//             "__v": 0
//         }
//     ]
// }
