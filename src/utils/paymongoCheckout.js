export const createPaymongoCheckout = async (amount, paymentTerm) => {
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
              send_email_receipt: true,
              show_description: true,
              show_line_items: true,
              line_items: [
                {
                  currency: "PHP",
                  amount: amount * 100, // Convert to centavos

                  name:
                    "Sophie Red Hotel" + paymentTerm == "down"
                      ? "Downpayment for room booking"
                      : "Fullpayment for room booking",
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
      const checkoutUrl = result.data.attributes.checkout_url;
      // window.open(checkoutUrl, "_blank");
      return { id: result.data.id, url: checkoutUrl };
    } else {
      console.error(
        "Error creating checkout session:",
        result.errors || result
      );
      return null;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
};
