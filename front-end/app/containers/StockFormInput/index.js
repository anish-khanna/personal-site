/* eslint-disable react/no-unescaped-entities */
/**
 *
 * StockFormInput
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { fetchStockData } from './actions';
import { updateFormInput } from '../StocksPage/actions';

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

export function StockFormInput(props) {
  const {
    onFetchStockData,
    onUpdateFormInput,
    id,
    symbol,
    purchaseDate,
    sellDate,
    stockNumber
  } = props;
  const currentDate = new Date();
  const twentyYearsAgo = new Date().setFullYear(currentDate.getFullYear() - 20);

  const classes = useStyles();

  const [stableInputTimer, setStableTimeout] = React.useState();
  const [stockSymbol, setStockSymbol] = React.useState(symbol);

  React.useEffect(() => {
    if (!(symbol.length === 0 || !symbol.trim())) {
      if (stableInputTimer) {
        clearTimeout(stableInputTimer);
      }
      setStableTimeout(
        setTimeout(() => {
          onFetchStockData(id, symbol, purchaseDate, sellDate, stockNumber);
        }, 1000)
      );
    }
  }, [symbol, purchaseDate, sellDate]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item xs={12} md={3} className={classes.formInput}>
        <TextField
          label="Stock Symbol"
          className={classes.stockSymbol}
          value={stockSymbol}
          onChange={event => {
            setStockSymbol(event.target.value.toUpperCase());
            onUpdateFormInput(id, {
              symbol: event.target.value.toUpperCase(),
              purchaseDate,
              sellDate,
              stockNumber
            });
          }}
        />
      </Grid>
      <Grid item xs={12} md={3} className={classes.formInput}>
        <KeyboardDatePicker
          label="Purchase Date"
          variant="inline"
          format="dd/MM/yyyy"
          InputAdornmentProps={{ position: 'start' }}
          value={purchaseDate}
          minDate={twentyYearsAgo}
          maxDate={sellDate > currentDate ? currentDate : sellDate}
          onChange={date =>
            onUpdateFormInput(id, {
              symbol,
              purchaseDate: date,
              sellDate,
              stockNumber
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={3} className={classes.formInput}>
        <KeyboardDatePicker
          label="Sell Date"
          variant="inline"
          format="dd/MM/yyyy"
          InputAdornmentProps={{ position: 'start' }}
          value={sellDate}
          minDate={purchaseDate}
          maxDate={currentDate}
          onChange={date =>
            onUpdateFormInput(id, {
              symbol,
              purchaseDate,
              sellDate: date,
              stockNumber
            })
          }
        />
      </Grid>
      <Grid item xs={12} md={2} className={classes.formInput}>
        <TextField
          label="# of Stocks Purchased"
          type="number"
          InputProps={{ inputProps: { min: 0 } }}
          value={stockNumber}
          onChange={event =>
            onUpdateFormInput(id, {
              symbol,
              purchaseDate,
              sellDate,
              stockNumber: event.target.value
            })
          }
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

StockFormInput.propTypes = {
  onFetchStockData: PropTypes.func,
  onUpdateFormInput: PropTypes.func,
  id: PropTypes.string,
  symbol: PropTypes.string,
  sellDate: PropTypes.object,
  purchaseDate: PropTypes.object,
  stockNumber: PropTypes.number
};

function mapDispatchToProps(dispatch) {
  return {
    onFetchStockData: (id, stockSymbol, purchaseDate, sellDate, stockNumber) =>
      dispatch(
        fetchStockData(id, stockSymbol, purchaseDate, sellDate, stockNumber)
      ),
    onUpdateFormInput: (id, object) => dispatch(updateFormInput(id, object))
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(StockFormInput);
