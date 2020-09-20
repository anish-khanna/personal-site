import { take, cancel, fork, call, put } from 'redux-saga/effects';
import { post } from '../../utils/request';
import { fetchStockDataSuccess } from '../StocksPage/actions';
import { FETCH_STOCK_DATA } from './constants';

function takeLatestById(patternOrChannel, saga, ...args) {
  return fork(function* takeLatestByIdAction() {
    const tasks = {};
    while (true) {
      const action = yield take(patternOrChannel);
      if (tasks[action.id]) {
        yield cancel(tasks[action.id]);
      }
      tasks[action.id] = yield fork(saga, ...args.concat(action));
    }
  });
}

function* fetchStocks(action) {
  const requestUrl = 'http://localhost:9000/api/stocks';
  const data = {
    symbol: action.symbol,
    fromDate: action.purchaseDate,
    toDate: action.sellDate
  };
  try {
    const stockData = yield call(post, requestUrl, null, data);
    yield put(
      fetchStockDataSuccess(
        action.id,
        action.symbol,
        action.purchaseDate,
        action.sellDate,
        stockData.data
      )
    );
  } catch (err) {
    console.error(err);
  }
}

export function* fetchStockData() {
  yield takeLatestById(FETCH_STOCK_DATA, fetchStocks);
}
