const pool = require("../../database");

module.exports = {
    insertunsubscription: (msisdn,serviceName,bundleId,response,callback) => {
 console.log(msisdn,serviceName,bundleId,response,serviceName,"optcallbac")

 console.log("response data", response.message)
        const insertQuery = process.env.INSERT_UNSUB
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


    insertsubscription: ( msisdn, OTP, bundleId,serviceName,response) => {
        console.log(msisdn,OTP, bundleId,response,serviceName,"optcallbac================")
       console.log("response data in services ===========", response)
        console.log("response message==========", response.message)
               const insertQuery = process.env.INSERT_SUBSCRIPTION
                   .replace('<msisdn>', msisdn)
                   .replace('<subscription_id>',response.data.subscription_id)
                   .replace('<is_active>', response.data.is_active)
                   .replace('<serviceName>', serviceName)
                   .replace('<subdatetime>',response.data.last_charged_time)
                   .replace('<nextbilled_date>', response.data.next_charging_date)
                   .replace('<bundle_id>',bundleId)
                   .replace('<code>',response.code)
                   .replace('<msg>',response.message)
                   .replace('<otp>',OTP)
                   .replace('<last_billeddate>',response.data.last_charged_time)
                   
                  
               pool.query(insertQuery, (err, res) => {
                   if (err) {
                       console.error(err); 
                         return 'failed'
                   } else {
                       console.log(res); 
                       return 'ok'
                   }
               });
           },
}


