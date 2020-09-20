/*
 *
 * StocksPage reducer
 *
 */
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';
import {
  ADD_FORM_LINE,
  STOCK_DATA_FETCH_SUCCESS,
  UPDATE_FORM_INPUT
} from './constants';

const initialId = `id-${uuidv4()}`;

export const initialState = {
  formInputs: {
    [initialId]: {
      symbol: 'AAPL',
      purchaseDate: new Date('Jan 1 2020'),
      sellDate: new Date(),
      stockNumber: 0
    }
  },
  stockInfo: {}
};

/* eslint-disable default-case, no-param-reassign */
const stocksPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_FORM_LINE:
        draft.formInputs = {
          ...draft.formInputs,
          [action.id]: {
            symbol: '',
            purchaseDate: new Date('Jan 1 2020'),
            sellDate: new Date(),
            stockNumber: 0
          }
        };
        break;
      case STOCK_DATA_FETCH_SUCCESS:
        draft.stockInfo[action.id] = {
          symbol: action.symbol,
          fromDate: action.fromDate,
          toDate: action.toDate,
          data: action.data.o || [],
          time: action.data.t || []
        };
        draft.stockInfo = { ...draft.stockInfo };
        break;
      case UPDATE_FORM_INPUT:
        if (action.symbol.length === 0 || !action.symbol.trim()) {
          delete draft.stockInfo[action.id];
          draft.stockInfo = { ...draft.stockInfo };
        }
        draft.formInputs[action.id] = {
          symbol: action.symbol,
          purchaseDate: action.purchaseDate,
          sellDate: action.sellDate,
          stockNumber: action.stockNumber
        };
        draft.formInputs = { ...draft.formInputs };
        break;
    }
  });

export default stocksPageReducer;
