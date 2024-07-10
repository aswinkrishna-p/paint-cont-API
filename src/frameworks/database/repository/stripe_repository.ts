import stripe from "../../services/stripe";
import { Req } from "../../types/serverPackageTypes";
import bookingModel from "../models/bookingModel";
import paymentModel from "../models/paymentModel";
import SlotModel from "../models/slotsModel";





class stripeRepository {

    async  stripePayment(req:Req, userId:string,slotId:string){
        try {
     
           
     
           const slot = await SlotModel.findById(slotId)
          
           console.log(slot,'slot in payment');
           
           if (!slot) {
              return {
                 success:false,
                 message:'Slot not found'
              }
            }
     
            if(slot.amount){
              const session = await stripe.checkout.sessions.create({
                 line_items: [{
                    price_data: {
                      currency: 'inr',
                      product_data: {
                        name: `Slot booking for ${slot.date}`,
                      },
                      unit_amount: slot.amount * 100,
                    },
                    quantity: 1,
                  }],
                  mode: 'payment',
                  success_url:'http://localhost:3000/payment-success',
                  cancel_url:'http://localhost:3000',
                  billing_address_collection: 'required',
              });
     
              req.app.locals.sessionId = session.id
              req.app.locals.Slot = slot
              req.app.locals.userid = userId

     
              return {
                 success:true ,
                 data:session.id
            }
     
           }
           
        } catch (error) {
           console.log(error);
           
        }
      }

        //payment success
  async PaymentSuccess(req: any):Promise<any> {

    console.log('inside payment success');

    const slot = req.app.locals.Slot
    const userId = req.app.locals.userid
    const sessionId = req.app.locals.sessionId
    
    const payload = req.body;
    const paymentIntentId = payload?.data?.object?.payment_intent
    const payloadString = JSON.stringify(payload, null, 2);
    const sig = req.headers["stripe-signature"];
    if (typeof sig !== "string") {
      return false;
    }
    const endpointSecret =
      "whsec_1b2137251322a336aeb0b02d725fa444eb458adcb2643d8aadd4215a010c4f82";
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: endpointSecret,
    });

    let event;

    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );

    if (paymentIntentId) {
      const paymentIntentResponse = await stripe.paymentIntents.retrieve(paymentIntentId);
      const paymentIntent = paymentIntentResponse
      if (paymentIntentResponse.latest_charge) {
        const chargeId = paymentIntentResponse.latest_charge;
        req.app.locals.chargeId = chargeId;
      } else {
        console.log('No latest charge found for this PaymentIntent.');
        return null;
      }
    }
    if (event.type == "payment_intent.succeeded") {
      const paymentData = new paymentModel({
        userId:userId,
        painterId:slot.painterId,
        amount:slot.amount,
        paymentId:sessionId
     })

     await paymentData.save()

     const slotbooked = await SlotModel.findByIdAndUpdate({_id:slot._id},{$set:{status:"booked"}})

      const newBooking = new bookingModel({
        date:new Date(),
        painterId:slot.painterId,
        userId
      })

      await newBooking.save()
      return true
    } else {
      return false;
    }
  }
}


export default stripeRepository