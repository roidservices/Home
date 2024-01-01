document.getElementById('checkout-button').addEventListener('click', function () {
    // Replace 'your-publishable-key' with your actual publishable key
    var stripe = Stripe('pk_live_51OTggkSGOHdHgFIX9Ldipn7gPdabCnOBdbiPoub7PPIDrGNq1L19Szv6uPso2ggrj9OPx6MXwRYfSNZPQ2u53mSk001npyWfL0');
  
    fetch('https://api.roidservices.github.io/create-checkout-session', {
      method: 'POST',
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (session) {
        return stripe.redirectToCheckout({ sessionId: session.id });
      })
      .then(function (result) {
        if (result.error) {
          alert(result.error.message);
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
      });
  });
  