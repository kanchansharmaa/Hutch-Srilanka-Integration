const { default: axios } = require("axios");

const sendOTP = async (bearerToken, msisdn, bundleId) => {
  const otpData = {
    number: msisdn,
    bundle_id: bundleId,
  };

  const config = {
    method: "POST",
     url: "https://sdp.hutch.lk/api/send-otp",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
    },
    data: otpData,
  };
  console.log(config);

  try {
    const response = await axios(config);
    console.log("OTP Sent successfully:", response.data);
    return response.data;
    // Handle the response data as needed
  } catch (error) {
    console.error("Error sending OTP:", error.response.data);
    return error.response.data;
    // Handle the error appropriately
  }
};

module.exports = { sendOTP };
