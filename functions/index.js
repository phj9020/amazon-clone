const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51ISGh0LEssIVFr3lHx9aN9NgKYlf3X253QqF40x1htfoD3RgoVa4X00tWDjsUeOZ2i1YHQptUYRxQl4CJcCfQS9u00bVwqAswG");

// API

// App config

const app = express();

// middlewares

app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment REquest Received", total);

  const paymentIntent = await stripe.paymentIntents.create({
    // subunit of the currency
    amount: total,
    currency: "usd",
  });

  // OK -- Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret});
});

// Listen-command-above
exports.api = functions.https.onRequest(app);


// example End Point
// http://localhost:5001/clone-f8fa9/us-central1/api


