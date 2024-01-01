// Import the Stripe module
const stripe = require('stripe')('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');

// Netlify function
exports.handler = async function (event, context) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Your Product',
            },
            unit_amount: 1000, // Replace with the actual amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://roidservices.github.io/success',
      cancel_url: 'https://roidservices.github.io/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
