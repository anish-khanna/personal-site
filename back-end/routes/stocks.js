const express = require('express');
const router = express.Router();
const finnhub = require('finnhub');
require('dotenv').config()

const apiKey = finnhub.ApiClient.instance.authentications.api_key;
apiKey.apiKey = process.env.FINNHUB_KEY;
const finnhubClient = new finnhub.DefaultApi();

/* GET home page. */
router.post('/', (req, res) => {
  const { body } = req;
  const { symbol, fromDate, toDate } = body.data;
  const interval = 'D';
  finnhubClient.stockCandles(
    symbol,
    interval,
    fromDate,
    toDate,
    {},
    (error, data) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

module.exports = router;
