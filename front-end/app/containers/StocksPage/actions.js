/*
 *
 * HomePage actions
 *
 */

import {
  ADD_FORM_LINE,
  STOCK_DATA_FETCH_SUCCESS,
  UPDATE_FORM_INPUT
} from './constants';

export function addFormInput(id) {
  return {
    type: ADD_FORM_LINE,
    id
  };
}

export function fetchStockDataSuccess(id, symbol, fromDate, toDate, data) {
  return {
    type: STOCK_DATA_FETCH_SUCCESS,
    id,
    symbol,
    fromDate,
    toDate,
    data
  };
}

export function updateFormInput(
  id,
  { symbol, purchaseDate, sellDate, stockNumber }
) {
  return {
    type: UPDATE_FORM_INPUT,
    id,
    symbol,
    purchaseDate,
    sellDate,
    stockNumber
  };
}
