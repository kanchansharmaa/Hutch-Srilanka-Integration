const { getToken } = require("../../lib/getToken");
const { getBundleIdByName } = require("../../lib/utils");
const registerWithOTP = require("../../lib/verifyOTP");
const { insertsubscription} = require("./registerOTP.services");

module.exports = {
  registerOTP: async (req, res) => {
    const { OTP, msisdn, serviceName } = req.body;
    
    try {
      const token = await getToken();
      if (!token) {
        console.log("Failed to retrieve token.");
        return res.status(500).json({ error: "Failed to retrieve token" });
      }
      
      const bundleId = getBundleIdByName(serviceName);
      if (bundleId === null) {
        console.log("Bundle Name not found or invalid.");
        return res.status(404).json({ error: "Bundle name not found or invalid" });
      }
      console.log(`Bundle Name: ${serviceName}, Bundle ID: ${bundleId}`);
      
      const response = await registerWithOTP(token, msisdn, OTP, bundleId);
      console.log("OTP Response ===================", response.data);
    console.log("code============",response.code)
     
      
      if (response.code == 0 || response.code==302) {
         console.log("code", response.code);
        try {

          await insertsubscription(msisdn, OTP, bundleId,serviceName,response);
console.log("response before sending", response)
          res.send(response);
        } catch (err) {
          console.log(err);
          res.status(400).json({ message: err.message });
        }
      } else {
        res.status(400).json({ message: "Invalid OTP or MSISDN", details: response.data });
      }
    } catch (error) {
      console.error("Error while processing registration:", error);
      res.status(500).json({ error: error.message });
    }
  },
};
