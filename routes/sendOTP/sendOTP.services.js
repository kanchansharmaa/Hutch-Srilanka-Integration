const pool = require("../../database");

module.exports = {
    insertOTPlogs: (msisdn,serviceName,bundleId,response,callback) => {
 console.log(msisdn,serviceName,bundleId,response,"optcallbac")

 console.log("response data", response.message)
        const insertQuery = process.env.INSERT_OTP_LOGS
            .replace('<msisdn>', msisdn)
            .replace('<service_name>', serviceName)
            .replace('<bundle_id>', bundleId)
            .replace('<code>', response.code)
            .replace('<msg>', response.message)
          
        pool.query(insertQuery, (err, res) => {
            if (err) {
                console.error(err); 
                return callback(err, null); 
            } else {
                console.log(res); 
                return callback(null, res); 
            }
        });
    },
}