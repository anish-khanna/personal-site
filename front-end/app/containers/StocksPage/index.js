/* eslint-disable react/no-unescaped-entities */
/**
 *
 * VsnPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Grid, FormControl, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { v4 as uuidv4 } from 'uuid';
import VsnImage from 'components/VsnImage';
import { Header } from 'containers/Header';
import vsnLogo from 'static/images/vsn logo no bg.png';
import StockFormInput from 'containers/StockFormInput';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { fetchStockData } from 'containers/StockFormInput/saga';
import StocksGraph from 'components/StocksGraph';
import reducer from './reducer';
import { addFormInput } from './actions';
import { makeSelectFormInputs, makeSelectStocksData } from './selectors';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    color: 'black',
    minHeight: '100vh'
  },
  widthConstrained: {
    maxWidth: '1400px',
    margin: 'auto',
    width: '95%'
  },
  centeredImg: {
    display: 'block',
    margin: 'auto'
  },
  vsnDef: {
    fontSize: '35px',
    fontFamily: 'Courier New'
  },
  topItem: {
    marginTop: '10px'
  },
  divider: {
    backgroundColor: 'white'
  },
  formControl: {
    width: '100%'
  },
  formInput: {
    textAlign: 'center'
  },
  stockSymbol: {
    width: '85%'
  }
}));

const calculateProfit = (stockData, formInputs) =>
  Object.entries(formInputs)
    .map(([key, val]) => {
      if (stockData[key]) {
        const numStocks = val.stockNumber;
        const dataVals = stockData[key].data;
        if (dataVals.length !== 0) {
          const difference = dataVals[dataVals.length - 1] - dataVals[0];
          return numStocks * difference;
        }
      }
      return 0;
    })
    .reduce((accumulator, value) => accumulator + value);

export function StocksPage(props) {
  const { formInputs, stockData, onAddFormLine } = props;

  useInjectReducer({ key: 'stocksPage', reducer });
  useInjectSaga({ key: 'fetchStockData', saga: fetchStockData });

  const addLine = () => {
    const ids = Object.keys(formInputs);
    let id = uuidv4();
    while (ids.includes(id)) {
      id = uuidv4();
    }
    onAddFormLine(`id-${id}`);
  };

  const profit = calculateProfit(stockData, formInputs).toFixed(2);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Stocks</title>
        <meta name="description" content="A small stock trading app" />
      </Helmet>
      <Header color="black" backgroundColor="white" />
      <div className={classes.widthConstrained}>
        <Grid container>
          <Grid item xs={12} className={classes.topItem}>
            <h1>The Stocks Page</h1>
          </Grid>
          <Grid item xs={12}>
            <p>Here you'll find that you can compare up to 10 stocks</p>
            <p>
              This is still a work in progress. Email me from the homepage if
              you have any ideas!
            </p>
          </Grid>
          <Grid item xs={12}>
            <p>
              You would have {profit >= 0 ? 'made' : 'lost'}{' '}
              <strong>{Math.abs(profit)} dollars</strong> with these purchases
            </p>
          </Grid>
          <Grid item xs={12}>
            <StocksGraph stockInfo={stockData} />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <Grid container justify="center" alignItems="flex-end">
                {Object.entries(formInputs).map(([index, val]) => (
                  <StockFormInput key={index} id={index} {...val} />
                ))}
                {Object.keys(formInputs).length < 10 ? (
                  <Grid item xs={12} className={classes.formInput}>
                    <IconButton
                      aria-label="add row"
                      size="medium"
                      onClick={addLine}
                    >
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  </Grid>
                ) : null}
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

StocksPage.propTypes = {
  formInputs: PropTypes.object,
  stockData: PropTypes.object,
  onAddFormLine: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  formInputs: makeSelectFormInputs(),
  stockData: makeSelectStocksData()
});

function mapDispatchToProps(dispatch) {
  return {
    onAddFormLine: id => dispatch(addFormInput(id))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(StocksPage);
