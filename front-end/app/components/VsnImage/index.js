/**
 *
 * VsnImage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'components/Loader';

const animationDuration = 2000;

const useStyles = makeStyles(() => ({
  image: {
    filter: 'grayscale(100%)',
    cursor: 'pointer',
    '&:hover': {
      filter: 'none'
    },
    opacity: props => (props.imgLoaded ? 1 : 0),
    filterBrightness: props => (props.imgLoaded ? 100 : 0),
    filterSaturate: props => (props.imgLoaded ? 100 : 20),
    transition: `
      filterBrightness ${animationDuration *
        0.75}ms cubic-bezier(0.4, 0.0, 0.2, 1),
      filterSaturate ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1),
      opacity ${animationDuration / 2}ms cubic-bezier(0.4, 0.0, 0.2, 1)`
  }
}));

function VsnImage(props) {
  const { src, alt, width, height, className } = props;

  const [imgLoaded, setImgLoaded] = React.useState(false);

  const classes = useStyles({ imgLoaded });

  return (
    <div>
      {imgLoaded ? null : <Loader />}
      <a href={src} target="_blank">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`${className} ${classes.image}`}
          onLoad={() => setImgLoaded(true)}
        />
      </a>
    </div>
  );
}

VsnImage.propTypes = {
  src: PropTypes.node,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};

export default memo(VsnImage);
