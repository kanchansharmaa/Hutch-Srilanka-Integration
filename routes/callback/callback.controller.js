const { insertCallback, insertintoSubscription, insertIntoBillingSuccess, updateSubscription,sendPromotionExistNumberHit, deleteSubscription } = require('./callback.service');

module.exports = {
    getCallback: (req, res) => {
        console.log("Callback data======\n", req.body);

        insertCallback(req.body, (error, result) => {
            if (error) {
                console.error('Error inserting callback data:', error);
                return res.status(500).send("Failed to insert data");
            }
            console.log('Insert successful:', result);

          
            if (req.body.event_id === 1) {
                // Subscription Insertion and Billing Success
                insertintoSubscription(req.body, (subError, subResult) => {
                    if (subError) {
                        console.error('Error inserting into subscription:', subError);
                        return res.status(500).send("Failed to insert into subscription");
                    }
                    console.log('Subscription insert successful:', subResult);

                    let type_event = 'SUB';
                    insertIntoBillingSuccess(req.body, type_event, (billingError, billingResult) => {
                        if (billingError) {
                            console.error('Error inserting into billing success:', billingError);
                            return res.status(500).send("Failed to insert into billing success");
                        }
                        console.log('Billing success insert successful:', billingResult);
                        
                        // Call to send promotion after billing success
                        sendPromotionExistNumberHit(
                            req.body.number,
                            req.body.bundle_id,
                             // Assuming this is a promotion ID or similar parameter
                            (err, promoCallback) => {
                                if (err) {
                                    console.error('Error sending promotion:', err);
                                    return res.status(500).send("Failed to send promotion");
                                }
                                console.log('Promotion sent successfully:', promoCallback);
                                res.json({ response: "Success" });
                            }
                        );
                    });
                });
            } 
            
            else if (req.body.event_id === 3) {
                // Subscription Update and Billing Success
                updateSubscription(req.body, (updateError, updateResult) => {
                    if (updateError) {
                        console.error('Error updating subscription:', updateError);
                        return res.status(500).send("Failed to update subscription");
                    }
                    console.log('Subscription update successful:', updateResult);

                    let type_event = 'REN';
                    insertIntoBillingSuccess(req.body, type_event, (billingError, billingResult) => {
                        if (billingError) {
                            console.error('Error inserting into billing success:', billingError);
                            return res.status(500).send("Failed to insert into billing success");
                        }
                        console.log('Billing success insert successful:', billingResult);
                        res.json({ response: "Success" });
                    });
                });
            } else if (req.body.event_id === 2) {
                //Unsubscribe
                deleteSubscription(req.body, (deleteError, deleteResult) => {
                    if (deleteError) {
                        console.error('Error deleting subscription:', deleteError);
                        return res.status(500).send("Failed to delete subscription");
                    }
                    console.log('Subscription delete successful:', deleteResult);
                    res.json({ response: "Success" });
                });
            } else {
                // No specific event ID action, just respond with success
                res.json({ response: "Success" });
            }
        });
    }
}
