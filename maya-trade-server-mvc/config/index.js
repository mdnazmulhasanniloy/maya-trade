const dotenv = require("dotenv").config();

const clientUrl = (payload) => {
    if (payload === "development") { 
      return "http://localhost:3000/";
    } else {
      return "https://maya-trade-client.vercel.app/";
    }
  };

exports.db_url = process.env.DATABASE_URL;
exports.port = process.env.SERVER_PORT;
exports.nod_env = process.env.NODE_ENV;
exports.server_url = process.env.SERVER_URL;
exports.client_url = clientUrl(this.nod_env);

exports.access_Token = process.env.ACCESS_TOKEN;

exports.store_id = process.env.PAYMENT_STORE_ID;
exports.store_password = process.env.PAYMENT_STORE_PASSWORD;
exports.ssl_payment_url = process.env.SSL_PAYMENT_URL;
exports.ssl_payment_validation_url = process.env.SSL_VALIDATION_URL;
