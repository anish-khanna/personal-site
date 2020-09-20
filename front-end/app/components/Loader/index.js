/**
 *
 * Loader
 *
 */

import React, { memo } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  progress: {
    color: 'grey',
    margin: 'auto',
    width: '50%',
    height: '50%'
  },
  parent: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    verticalAlign: 'center'
  }
}));

function Loader() {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <CircularProgress disableShrink className={classes.progress} />
    </div>
  );
}

Loader.propTypes = {};

export default memo(Loader);
