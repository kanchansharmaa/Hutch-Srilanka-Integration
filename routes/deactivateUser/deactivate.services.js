const pool = require("../../database");

module.exports = {
  insertUnsub: (msisdn, serviceName, bundleId, response, callback) => {
    console.log(msisdn, serviceName, bundleId, response, "optcallbac");
    console.log("response data", response.data);

    const insertQuery = process.env.INSERT_UNSUB
      .replace('<msisdn>', msisdn)
      .replace('<service>', serviceName)
      .replace('<bundleid>', bundleId)
      .replace('<code>', response.data.code)
      .replace('<message>', response.data.message);

    pool.query(insertQuery, (insertErr, insertRes) => {
      if (insertErr) {
        console.error("Error inserting into tbl_unsub:", insertErr);
        return callback(insertErr, null);
      } else {
        console.log("Insert result:", insertRes);
        return callback(null, insertRes);
      }
    });
  }
};