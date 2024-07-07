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
}


export default stripeRepository