const { getToken } = require("../../lib/getToken");
const { getBundleIdByName } = require("../../lib/utils");

const {insertUnsub}=require('./deactivate.services')
const axios = require("axios");

module.exports = {
  DeactivateUser: async (req, res) => {
    try {
      const { msisdn, serviceName } = req.body;

      const token = await getToken();
      // console.log("token--", token)
      const bundleId = getBundleIdByName(serviceName);

      if (bundleId !== null) {
        console.log(`Bundle Name: ${serviceName}, Bundle ID: ${bundleId}`);
      } else {
        console.log("Bundle Name not found or invalid.");
        return res.status(400).send("Bundle Name not found or invalid.");
      }

      console.log("bundleId ", bundleId);

      const requestData = {
        number: msisdn,
        bundle_id: bundleId
      };

      const config = {
        method: "POST",
        url: process.env.API_DEACTIVATE_USER,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: requestData,
      };

      const response = await axios(config);
      console.log("Deactivation successful:", response.data);
      insertUnsub(msisdn,serviceName,bundleId,response,(err,result)=>{
        if(err){
            console.log(err)
            res.status(400).json({error:err})
        }
        console.log(result,"result")     
       })

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error Deactivation:", error.response ? error.response.data : error.message);
      res.status(500).send(error.response ? error.response.data : "Internal Server Error");
    }
  },
};
