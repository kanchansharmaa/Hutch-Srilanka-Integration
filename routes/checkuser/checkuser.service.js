const pool = require('../../database')
const { default: axios } = require("axios");

module.exports={

    checkUserSubscription: (msisdn,service, callback) => {
        const checkActiveUser = process.env.checkActiveUser
          .replace("<msisdn>", msisdn)
          .replace("<serviceName>", service);
      
        pool.query(`${checkActiveUser}`, [], (err, result) => {
          if (err) return callback(err);
    
          return callback("", result);
        });
      },
}