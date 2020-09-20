import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectStocksPage = state => state.stocksPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectFormInputs = () =>
  createSelector(
    selectStocksPage,
    substate => substate.formInputs
  );

const makeSelectStocksData = () =>
  createSelector(
    selectStocksPage,
    substate => substate.stockInfo
  );

export { makeSelectFormInputs, makeSelectStocksData };
