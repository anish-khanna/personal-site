/* eslint-disable react/no-unescaped-entities */
/**
 *
 * CountryCollection
 *
 */

import React, { memo } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VsnImage from 'components/VsnImage';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  widthConstrained: {
    maxWidth: '1400px',
    width: '95%',
    margin: 'auto'
  },
  header: {
    fontSize: '75px',
    fontFamily: 'Georgia',
    marginTop: '35px',
    marginBottom: '10px'
  },
  textParent: {
    textAlign: 'center'
  },
  description: {
    fontSize: '25px',
    fontFamily: 'Courier New',
    margin: '0px'
  },
  imageGrid: {
    width: '95%',
    margin: 'auto'
  },
  image: {
    minHeight: '400px'
  }
}));

function VsnCollection(props) {
  const {
    collectionHeader,
    collectionDescFirst,
    collectionDescSecond,
    imageObjList
  } = props;

  const numImages = imageObjList.length;

  const medSize = numImages === 1 || numImages === 2 || numImages === 4 ? 6 : 4;

  const classes = useStyles();

  return (
    <div>
      <div className={classes.widthConstrained}>
        <div className={classes.textParent}>
          <p className={classes.header}>{collectionHeader}</p>
        </div>
        <div className={classes.textParent}>
          <p className={classes.description}>
            {collectionDescFirst.toLowerCase()}
          </p>
          <p className={classes.description}>
            {collectionDescSecond.toUpperCase()}
          </p>
        </div>
      </div>
      <Grid
        container
        spacing={4}
        className={classes.imageGrid}
        alignItems="center"
        alignContent="center"
        justify="center"
      >
        {imageObjList.map(imageObj => (
          <Grid
            key={imageObj.src}
            item
            xs={12}
            md={medSize}
            className={classes.image}
          >
            <VsnImage src={imageObj.src} alt={imageObj.alt} width="100%" />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

VsnCollection.propTypes = {
  collectionHeader: PropTypes.string,
  collectionDescFirst: PropTypes.string,
  collectionDescSecond: PropTypes.string,
  imageObjList: PropTypes.arrayOf(PropTypes.object)
};

export default memo(VsnCollection);
