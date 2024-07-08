import stripe from "../../services/stripe";
import SlotModel from "../models/slotsModel";





class stripeRepository {

    async  stripePayment(userId:string,slotId:string){
        try {
     
           
     
           const slot = await SlotModel.findById(slotId)
     
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
     
     
            //   const paymentData = new paymentModel({
            //      userId:userId,
            //      painterId:slot.painterId,
            //      amount:slot.amount,
            //      paymentId:session.id
            //   })
     
            //   await paymentData.save()
     
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
    if (event.type == "checkout.session.completed") {
      return true;
    } else {
      return false;
    }
  }
}


export default stripeRepository