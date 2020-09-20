/* eslint-disable react/no-unescaped-entities */
/**
 *
 * VsnPage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VsnImage from 'components/VsnImage';
import Header from 'containers/Header';
import vsnLogo from 'static/images/vsn logo no bg.png';
import VsnCollection from 'components/VsnCollection';
import {
  COUNTRY_COLLECTION,
  PAINTING_COLLECTION,
  VIRAL_COLLECTION
} from './constants';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    color: 'white'
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
  }
}));

export function VsnPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>VSN</title>
        <meta
          name="description"
          content="VSN: A small art collective to provide perspective."
        />
      </Helmet>
      <Header color="white" backgroundColor="black" />
      <div className={classes.widthConstrained}>
        <Grid container>
          <Grid item xs={12} className={classes.topItem}>
            <VsnImage
              className={classes.centeredImg}
              src={vsnLogo}
              alt="VSN LOGO"
              width="150px"
            />
          </Grid>
          <Grid item xs={12} className={classes.vsnDef}>
            <p className={classes.vsnDef}>vsn ['vi-zhen']:</p>
            <ul>
              <li>the act or power of seeing;</li>
              <li>a thought, concept, or object formed by the imagination.</li>
            </ul>
          </Grid>
        </Grid>
      </div>
      <Divider className={classes.divider} />
      <VsnCollection {...COUNTRY_COLLECTION} />
      <Divider className={classes.divider} />
      <VsnCollection {...PAINTING_COLLECTION} />
      <Divider className={classes.divider} />
      <VsnCollection {...VIRAL_COLLECTION} />
    </div>
  );
}

VsnPage.propTypes = {};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(VsnPage);
