const { getToken } = require("../../lib/getToken");
const { getBundleIdByName } = require("../../lib/utils");
const axios = require("axios");

module.exports = {
  RegisterUser: async (req, res) => {
    try {
      const { msisdn, serviceName } = req.body;

      const token = await getToken();
      console.log("token--",token)
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
        url: process.env.API_REGISTER_USER,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: requestData,
      };

      console.log("Request data\n", config)
      const response = await axios(config);
      console.log("RegistrationUser successful:", response.data);

      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error registering:", error.response ? error.response.data : error.message);
      res.status(500).send(error.response ? error.response.data : "Internal Server Error");
    }
  },
};
