/*
 *
 * StockFormInput actions
 *
 */

import { FETCH_STOCK_DATA } from './constants';

export function fetchStockData(
  id,
  symbol,
  purchaseDate,
  sellDate,
  stockNumber
) {
  return {
    type: FETCH_STOCK_DATA,
    id,
    symbol,
    purchaseDate: Math.round(purchaseDate.getTime() / 1000),
    sellDate: Math.round(sellDate.getTime() / 1000),
    stockNumber
  };
}
