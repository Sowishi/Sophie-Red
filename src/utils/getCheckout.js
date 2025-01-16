export async function getCheckoutPaymongo(sessionId) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization: "Basic c2tfdGVzdF9WeE5hUUUzYzJqTnV3WWtENkpMZzJnNTE6",
    },
  };

  try {
    const res = await fetch(
      `https://api.paymongo.com/v1/checkout_sessions/${sessionId}`,
      options
    );
    const data = await res.json();
    const status = data.data.attributes.payment_intent.attributes.status;
    console.log(status);
    return status;
  } catch (err) {
    console.error("Error:", err);
    throw err; // Re-throw error so that it's handled elsewhere if needed
  }
}
