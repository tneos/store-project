"use client";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import React, {Suspense, useCallback} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE as string);

function Checkout() {
  // Get params
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const cartId = searchParams.get("cartId");

  // Make request to server
  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      orderId,
      cartId,
    });

    // Return stripe key to client
    return response.data.clientSecret;
  }, []);

  const options = {fetchClientSecret};

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
}
