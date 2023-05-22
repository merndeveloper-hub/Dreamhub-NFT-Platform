const { findOne, find } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const getAllLaunchData = async (req, res) => {
  try {
//     const {userAddress} = req.body
// console.log(userAddress);

    const launchpad = await find("launchPad",{
      status:"Deployed"});

if(launchpad.length < 1){
    return res.json({status:401, message:"Oops No Data Found!"});
}
    // let approvedData = launchpad.filter(obj => obj.status === "approved")
       
    // console.log(approvedData, "approvedData..."); 
   
   

    return res.status(200).send({ status: 200, msg:"User get the launchpad data successfully" , launchpad });

  } catch (e) {

    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getAllLaunchData;
