const pool = require('../../database')
require('dotenv').config()
const moment = require('moment');
const { getBundleNameByID } = require('../../lib/utils')
const { default: axios } = require("axios");
const { json } = require('express');
module.exports = {
    insertCallback: (data, callback) => {
      
        let svc_name = getBundleNameByID(data.bundle_id)
        console.log("svc_name", svc_name)
        let type_event;
        if (data.event_id == '1') {
            type_event = 'SUB'
        }
        if (data.event_id == '2') {
            type_event = 'UNSUB'
        }
        if (data.event_id == '3') {
            type_event = 'REN'
        }


        const insertCallbackLogs = process.env.insertCallbackLogs
            .replace('<msisdn>', data.number)
            .replace('<event_id>', data.event_id)
            .replace('<bundleid>', data.bundle_id)
            .replace('<chargeResult>', data.event_details.chargeResult)
            .replace('<svc_name>', svc_name)
            .replace('<amount>', '6')
            .replace('<type_event>', type_event);


        console.log("insertCallbackLogs ", insertCallbackLogs);

        pool.query(`${insertCallbackLogs}`, [], (err, result) => {

            if (err) return callback(err);
            else return callback("", "Success");
        });
    },

    insertintoSubscription: (data, callback) => {
        let svc_name = getBundleNameByID(data.bundle_id);
        console.log("svc_name", svc_name);
    
   
        let eventTime = moment(data.event_details.time).format('YYYY-MM-DD HH:mm:ss');
        console.log("Event Time:", eventTime);
    
    
        let nextBilledDate = moment(data.event_details.time).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        console.log("Next Billed Date:", nextBilledDate);
    
        const insertIntoSubscription = process.env.insertIntoSubscription
            .replace('<msisdn>', data.number)
            .replace('<event_id>', data.event_id)
            .replace('<bundle_id>', data.bundle_id)
            .replace('<serviceName>', svc_name)
            .replace('<amount>', '6') 
            .replace('<type_event>', 'SUB')
            .replace('<subdatetime>', eventTime)  
            .replace('<last_billeddate>', eventTime)  
            .replace('<nextbilled_date>', nextBilledDate)  
    
        console.log("insertIntoSubscription ", insertIntoSubscription);
    
        pool.query(`${insertIntoSubscription}`, [], (err, result) => {
            if (err) return callback(err);
            else return callback(null, "Success");  
        });
    },

    insertIntoBillingSuccess: (data,type_event, callback) => {

        let svc_name = getBundleNameByID(data.bundle_id)
        console.log("svc_name", svc_name)

        let eventTime = moment(data.event_details.time).format('YYYY-MM-DD HH:mm:ss');
        console.log("Event Time:", eventTime);
    
    
        let nextBilledDate = moment(data.event_details.time).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        console.log("Next Billed Date:", nextBilledDate);


        const insertIntoBillingSuccess = process.env.insertIntoBillingSuccess
            .replace('<msisdn>', data.number)
            .replace('<event_id>', data.event_id)
            .replace('<bundle_id>', data.bundle_id)
            .replace('<serviceName>', svc_name)
            .replace('<amount>', '6')
            .replace('<type_event>', type_event)
            .replace('<billing_datetime>', eventTime)
            .replace('<nextbilled_date>', nextBilledDate)
  



        console.log("insertIntoBillingSuccess ", insertIntoBillingSuccess);

        pool.query(`${insertIntoBillingSuccess}`, [], (err, result) => {

            if (err) return callback(err);
            else return callback("", "Success");
        });
    },

    updateSubscription : (data, callback) => {
       
    
        let type_event = 'REN';
        let svc_name = getBundleNameByID(data.bundle_id)
        console.log("svc_name", svc_name)

        let eventTime = moment(data.event_details.time).format('YYYY-MM-DD HH:mm:ss');
        console.log("Event Time:", eventTime);
    
    
        let nextBilledDate = moment(data.event_details.time).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        console.log("Next Billed Date:", nextBilledDate);

    
        // Use process.env.updateTblSubscription for updating tbl_subscription
        const updateTblSubscription = process.env.updateTblSubscription
            .replace('<msisdn>', data.number)
            .replace('<last_billeddate>',eventTime)
            .replace('<nextbilled_date>',nextBilledDate)
            .replace('<type_event>', type_event)
            .replace('<event_id>', data.event_id)
            .replace('<serviceName>', svc_name)

    
        console.log("Subscription Update SQL:", updateTblSubscription);
    
        pool.query(updateTblSubscription, [], (err, updateResult) => {
            if (err) {
                console.error('Error updating subscription:', err);
                return callback(err);
            }
            console.log("Updated subscription for MSISDN:", data.number);
            return callback(null, "Success");
        });
    },

    deleteSubscription: (data, callback) => {
       
        let svc_name = getBundleNameByID(data.bundle_id)
        console.log("svc_name", svc_name)
       
    
        const insertIntoTblUnsub = process.env.insertIntoTblUnsub
          .replace('<msisdn>', data.number)
          .replace('<type_event>', 'UNSUB')
          .replace('<event_id>', data.event_id)
          .replace('<bundle_id>', data.bundle_id)
          .replace('<serviceName>', svc_name)
         
    
        pool.query(insertIntoTblUnsub, [], (err, insertResult) => {
          if (err) {
            console.error("Error inserting into tbl_subscription_unsub", err);
            return callback(err);
          }
    
    
    
          const deleteSubQuery = process.env.deletefromSubscription
          .replace('<msisdn>', data.number)
          .replace('<serviceName>', svc_name);

          
    
    
          pool.query(deleteSubQuery, [], (err, deleteResult) => {
            if (err) {
              console.error("Error deleting from tbl_subscription", err);
              return callback(err);
            }
    
            return callback(null, "Success in unsubscribing");
          });
        });
      },

    //   sendPromotionExistNumberHit: async (ani, bundleid, callback) => {
    //     let service;
    //     if (bundleid == '809') {
    //         service = 'Game_offy';
    //     } else if (bundleid == '807') {
    //         service = 'Kidszone_pro';
    //     } else if (bundleid == '805') {
    //         service = 'Fito_offy';
    //     }
    
    //     console.log("promotion details\n", ani, bundleid, service);
    //     const url = process.env.forwardSubPromotion
    //       .replace("<ANI>", ani)
    //       .replace("<SERVICE_NAME>", service)
    //       .replace("<SERVICE_ID>", bundleid);
    
    //     console.log("url ", url);
    
    //     try {
    //       const response = await axios.get(url);
    //       console.log("RESPONSE ", response.data);
    
    //       const insertintoPromotion = process.env.INSERT_PROMOTION
    //           .replace("<msisdn>", ani)
    //           .replace("<response>",  JSON.stringify(response.data))
    //           .replace("<service>", service)
    //           .replace("<url>",url)
    //           .replace('<bundleid>',bundleid)
    
        
    //       pool.query(insertintoPromotion, (err, res) => {
    //         if (err) {
    //           console.error("Failed to insert into promotion table", err);
    //           return callback(err);
    //         } else {
    //           console.log("Inserted into promotion table successfully", res);
    //           return callback("", response.data);
    //         }
    //       });
    //     } catch (err) {
    //       console.log("Error while making GET request", err.response ? err.response.data : err);
    //       return callback(err.response ? err.response.data : err);
    //     }
    // }
    
    sendPromotionExistNumberHit: async (ani, bundleid, callback) => {
        let service;
        if (bundleid == '809') {
            service = 'Game_offy';
        } else if (bundleid == '807') {
            service = 'Kidszone_pro';
        } else if (bundleid == '805') {
            service = 'Fito_offy';
        }
    
        console.log("promotion details\n", ani, bundleid, service);
        const url = process.env.forwardSubPromotion
          .replace("<ANI>", ani)
          .replace("<SERVICE_NAME>", service)
          .replace("<SERVICE_ID>", bundleid);
    
        console.log("url ", url);
    
        let response; // Declare response outside try-catch to use it in both try and catch blocks
        try {
            response = await axios.get(url);
            console.log("RESPONSE ", response.data);
        } catch (err) {
            console.log("Error while making GET request", err.response ? err.response.data : err);
            // Handle error by assigning a default error response if it's not present
            response = err.response || { data: { error: "Request failed", details: err.toString() }};
        }
    
        // Insert data into the database whether request succeeded or failed
        const insertQuery = process.env.INSERT_PROMOTION
            .replace("<msisdn>", ani)
            .replace('<response>', JSON.stringify(response.data))
            .replace("<service>", service)
            .replace("<url>", url)
            .replace("<bundleid>", bundleid);
    
        pool.query(insertQuery, (err, res) => {
            if (err) {
                console.error("Failed to insert into promotion table", err);
                return callback(err);
            } else {
                // console.log("Inserted into promotion table successfully", res);
                return callback("", response.data);
            }
        });
    }
    
    
}