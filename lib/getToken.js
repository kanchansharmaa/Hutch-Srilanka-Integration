const axios = require("axios");

const getToken = async () => {
  let data = JSON.stringify({
    grant_type: "password",
    client_id: process.env.ClientId,
    client_secret: process.env.Client_Secret,
    username: process.env.UserNamed,
    password: process.env.password,
    scope: "",
  });

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url: process.env.API_URL_AUTH,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data.access_token; // Assuming the token is in 'access_token' field, modify as needed
  } catch (error) {
    console.error("ERROR", error.response.data);
    return null; // Return null or handle the error as needed
  }
};

module.exports = { getToken };
