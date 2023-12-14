const dotenv = require("dotenv").config();

exports.db_url = process.env.DATABASE_URL;
exports.port = process.env.SERVER_PORT;
exports.nod_env = process.env.NODE_ENV;

exports.access_Token = process.env.ACCESS_TOKEN;

exports.store_id = process.env.PAYMENT_STORE_ID;
exports.store_password = process.env.PAYMENT_STORE_PASSWORD;
exports.ssl_payment_url = process.env.SSL_PAYMENT_URL;
exports.ssl_payment_validation_url = process.env.SSL_VALIDATION_URL;
