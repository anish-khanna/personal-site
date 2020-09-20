/*
 *
 * StockFormInput reducer
 *
 */
import produce from 'immer';
import { FETCH_STOCK_DATA } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const stockFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_STOCK_DATA:
        break;
    }
  });

export default stockFormReducer;
