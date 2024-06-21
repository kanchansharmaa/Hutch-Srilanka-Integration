const axios = require("axios");

const registerWithOTP = async (bearerToken, msisdn, OTP, bundleId) => {
  const requestData = {
    number: msisdn,
    bundle_id: bundleId,
    otp: OTP,
    channel: "api",
  };

  const config = {
    method: "POST",
    url: process.env.API_URL_REGISTER_OTP,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    data: requestData,
  };

  try {
    const response = await axios(config);
    console.log("Registration with OTP successful:", response.data);
    return response.data;
    // Handle the response data as needed
  } catch (error) {
    console.error("Error registering with OTP:", error.response.data);
    return error.response.data;
    // Handle the error appropriately
  }
};

module.exports = registerWithOTP;
