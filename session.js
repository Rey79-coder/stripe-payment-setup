// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc', {apiVersion: ''});

const sessionId = async function() {
    const product = await stripe.products.create({
        name:"Soup",
        description: "Tasty"
    })

    const price = await stripe.prices.create({
        product: product.id,
        //PRICE NEEDS TO BE IN CENTS
        unit_amount: 1000,
        currency: "usd"
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: [ 'card'],
        line_items: [
            {
                price: price.id,
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: "https://example.com/success?session_id={CHECKOUT_SESSION}",
        cancel_url: "https://example.com/cancel"
    })
    console.log(session.id)
}

sessionId();