const axios = require("axios");
const { getToken } = require("../../lib/getToken");
const { sendOTP } = require("../../lib/sendOTP");
const { getBundleIdByName } = require("../../lib/utils");
const {insertOTPlogs} = require("./sendOTP.services")
module.exports = {
  sendOTPController: (req, res) => {
    const { msisdn, serviceName } = req.body;
    const bundleId = getBundleIdByName(serviceName);
    if (bundleId !== null) {
      console.log(`Bundle Name: ${serviceName}, Bundle ID: ${bundleId}`);
    } else {
      console.log("Bundle Name not found or invalid."); // Handle unknown or invalid bundle names
    }
    console.log("bundleId ", bundleId);
    getToken()
      .then((token) => {
        if (token) {
          // console.log("Token:", token);
          sendOTP(token, msisdn, bundleId)
            .then((response) => {
              console.log("OTP Response ", response);

              insertOTPlogs(msisdn,serviceName,bundleId,response,(err,result)=>{
                if(err){
                    console.log(err)
                    res.status(400).json({error:err})
                }
                console.log(result,"result")     
            })
              res.send(response);
            })
            .catch((err) => console.error(err));
          // Use the token for further operations
        } else {
          console.log("Failed to retrieve token.");
        }
      })
      .catch((error) => {
        console.error("Error while getting token:", error);
      });
  },
};
