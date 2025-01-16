export const createPaymongoCheckout = async (amount) => {
  try {
    const response = await fetch(
      "https://api.paymongo.com/v1/checkout_sessions",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          authorization: "Basic c2tfdGVzdF9WeE5hUUUzYzJqTnV3WWtENkpMZzJnNTE6",
        },
        body: JSON.stringify({
          data: {
            attributes: {
              send_email_receipt: false,
              show_description: true,
              show_line_items: true,
              line_items: [
                {
                  currency: "PHP",
                  amount: amount * 100, // Convert to centavos
                  description: "Sophie Red Hotel",
                  name: "Sophie Red Hotel",
                  quantity: 1,
                },
              ],
              payment_method_types: [
                "qrph",
                "billease",
                "card",
                "dob",
                "dob_ubp",
                "brankas_bdo",
                "brankas_landbank",
                "brankas_metrobank",
                "gcash",
                "grab_pay",
                "paymaya",
              ],
              description: "Sophie Red Hotel",
            },
          },
        }),
      }
    );

    const result = await response.json();

    if (response.ok && result.data) {
      // Open the checkout_url in a new tab
      const checkoutUrl = result.data.attributes.checkout_url;
      window.open(checkoutUrl, "_blank");
    } else {
      console.error(
        "Error creating checkout session:",
        result.errors || result
      );
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
