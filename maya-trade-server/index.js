const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
//payment require
const SSLCommerzPayment = require("sslcommerz-lts");
const payment_tore_id = process.env.PAYMENT_STORE_ID;
const payment_tore_passwd = process.env.PAYMENT_STORE_PASSWORD;
const is_live = false;

const jwt = require("jsonwebtoken");
moment = require("moment");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//db connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.m5oy2hh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// console.log(client)

const run = async () => {
  try {
    //db table
    const userCollection = client
      .db(`${process.env.DB_USER}`)
      .collection("users");
    const productCollection = client
      .db(`${process.env.DB_USER}`)
      .collection("products");
    const categoriesCollection = client
      .db(`${process.env.DB_USER}`)
      .collection("categories");
    const OrderCollection = client
      .db(`${process.env.DB_USER}`)
      .collection("orders");

    //add user
    app.post("/users", async (req, res) => {
      try {
        const data = req.body;
        const result = await userCollection.insertOne(data);
        if (result?.acknowledged) {
          return res.send({ success: true, data: result });
        }
        return res.status(403).send({
          success: false,
          error: { message: "Server Internal Error", status: 500 },
        });
      } catch (error) {
        return res.status(403).send({
          success: false,
          error: { message: "Server Internal Error", status: 500 },
        });
      }
    });

    //get user

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      // console.log(email)
      const result = await userCollection.findOne({ email: email });
      if (result?.email) {
        const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
          expiresIn: "3d",
        });
        return res.send({
          success: true,
          data: { ...result, accessToken: token },
        });
      }
      return res.send({ success: false, error: { message: "Invalid User" } });
    });

    //get product
    app.get("/products", async (req, res) => {
      const cursor = productCollection.find({});
      const product = await cursor.toArray();
      // console.log(product);
      if (!product) {
        return res.send({
          success: false,
          error: { message: "Server Internal Error", status: 500 },
        });
      }
      res.send({ success: true, data: product });
    });

    //add productnpms
    app.post("/product", async (req, res) => {
      const product = req.body;

      const result = await productCollection.insertOne(product);
      console.log(result);

      if (!result?.acknowledged) {
        return res.send({
          success: false,
          error: { message: "Server Internal Error", status: 500 },
        });
      }

      res.send({ success: true, productId: result?.insertedId });
    });

    //update product
    app.put("/product/update/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const productDetails = req.body;
        // console.log(id, productDetails);
        const filter = { _id: new ObjectId(id) };
        const justNow = moment().format();
        const updateDoc = {
          $set: {
            ...productDetails,
            updatedAt: justNow,
          },
        };
        const options = { upsert: true };
        const result = await productCollection.updateOne(
          filter,
          updateDoc,
          options
        );

        if (result?.modifiedCount) {
          console.log(result);
          res.send({ success: true, data: result });
        } else {
          res.send({ success: false, error: "server internal error" });
        }
      } catch (error) {
        res.send({
          success: false,
          error: error.message,
        });
      }
    });

    //delete product

    app.delete("/product/delete/:id", async (req, res) => {
      const id = req.params.id;
      const productQuery = {
        _id: new ObjectId(id),
      };
      const result = await productCollection.deleteOne(productQuery);
      console.log(result);
      res.send(result);
    });

    //get categories
    app.get("/categories", async (req, res) => {
      const cursor = categoriesCollection.find({});
      const product = await cursor.toArray();
      // console.log(product);
      if (!product) {
        return res.send({
          success: false,
          error: { message: "Server Internal Error", status: 500 },
        });
      }
      res.send({ success: true, data: product });
    });

    //add category
    app.post("/category", async (req, res) => {
      const product = req.body;

      const result = await categoriesCollection.insertOne(product);
      console.log(result);

      if (!result?.acknowledged) {
        return res.send({
          success: false,
          error: { message: "Server Internal Error", status: 500 },
        });
      }

      res.send({ success: true, categoryId: result?.insertedId });
    });

    //update category
    app.put("/category/update/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const categoryDetails = req.body;
        const filter = { _id: new ObjectId(id) };
        const justNow = moment().format();
        const updateDoc = {
          $set: {
            ...categoryDetails,
            updatedAt: justNow,
          },
        };
        const options = { upsert: true };
        const result = await categoriesCollection.updateOne(
          filter,
          updateDoc,
          options
        );

        if (result?.modifiedCount) {
          res.send({ success: true, data: result });
        } else {
          res.send({ success: false, error: "server internal error" });
        }
      } catch (error) {
        res.send({
          success: false,
          error: error.message,
        });
      }
    });

    app.delete("/category/delete/:id", async (req, res) => {
      const id = req.params.id;
      const categoryQuery = {
        _id: new ObjectId(id),
      };
      const result = await categoriesCollection.deleteOne(categoryQuery);
      console.log(result);
      res.send(result);
    });

    const tranId = await new ObjectId().toString();
    app.post("/checkout", async (req, res) => {
      try {
        // console.log(req.body);

        const { ProductInfo, userId, price } = req?.body;

        const user = await userCollection.findOne({
          _id: new ObjectId(userId),
        });
        if (!user) {
          res.send({ success: false, message: "invalid user" });
          return;
        }

        const {
          email,
          firstName,
          phone,
          address: { country, state, city, area },
        } = user;
        // console.log(user);

        const data = {
          total_amount: price,
          currency: "BDT",
          tran_id: tranId, // use unique tran_id for each api call
          success_url: `http://localhost:5000/payment/success/${tranId}`,
          fail_url: "http://localhost:3030/fail",
          cancel_url: "http://localhost:3030/cancel",
          ipn_url: "http://localhost:3030/ipn",
          shipping_method: "Courier",
          product_name: "Computer.",
          product_category: "Electronic",
          product_profile: "general",
          cus_name: firstName,
          cus_email: email,
          cus_add1: area,
          cus_add2: area,
          cus_city: city,
          cus_state: state,
          cus_postcode: "1000",
          cus_country: country,
          cus_phone: phone,
          cus_fax: phone,
          ship_name: "Mostafizur Rahman",
          ship_add1: "Dhaka",
          ship_add2: "Dhaka",
          ship_city: "Dhaka",
          ship_state: "Dhaka",
          ship_postcode: 1000,
          ship_country: "Bangladesh",
        };

        const sslcz = new SSLCommerzPayment(
          payment_tore_id,
          payment_tore_passwd,
          is_live
        );

        sslcz?.init(data)?.then(async (apiResponse) => {
          // Redirect the user to payment gateway
          let GatewayPageURL = apiResponse.GatewayPageURL;
          res.send({ success: true, url: GatewayPageURL });
          const finalOrder = {
            products: [...ProductInfo],
            userId: userId,
            paidStatus: false,
            transitionId: tranId,
            orderStatus: "pending",
          };

          const result = await OrderCollection.insertOne(finalOrder);
          // console.log("Redirecting to: ", GatewayPageURL);
        });

        app.post("/payment/success/:tranId", async (req, res) => {
          const tranId = req.params.tranId;
          const result = await OrderCollection.updateOne(
            { transitionId: tranId },
            {
              $set: { paidStatus: "true" },
            }
          );
          if (result?.modifiedCount > 0) {
            res.redirect(
              `http://localhost:3000/dashboard/dashboard/payment/success/${tranId}`
            );
          }

          // console.log(tranId);
        });
      } catch (err) {
        console.error(err);
        res.send({ error: err?.message });
      }
    });

    //
  } finally {
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("simple server is running");
});

app.listen(port, () => {
  console.log(`simple server running on prot ${port}`);
});
