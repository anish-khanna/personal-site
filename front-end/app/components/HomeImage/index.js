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
    opacity: props => (props.imgLoaded ? 1 : 0),
    filterBrightness: props => (props.imgLoaded ? 100 : 0),
    filterSaturate: props => (props.imgLoaded ? 100 : 20),
    transition: `
      filterBrightness ${animationDuration *
        0.75}ms cubic-bezier(0.4, 0.0, 0.2, 1),
      filterSaturate ${animationDuration}ms cubic-bezier(0.4, 0.0, 0.2, 1),
      opacity ${animationDuration / 2}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
    maxWidth: props => props.maxWidth,
    maxHeight: props => props.maxHeight
  }
}));

function HomeImage(props) {
  const { src, alt, maxWidth, maxHeight, className, ...imageProps } = props;

  const [imgLoaded, setImgLoaded] = React.useState(false);

  const classes = useStyles({ imgLoaded, maxHeight, maxWidth });

  return (
    <div>
      {imgLoaded ? null : <Loader />}
      <img
        src={src}
        alt={alt}
        {...imageProps}
        className={`${className} ${classes.image}`}
        onLoad={() => setImgLoaded(true)}
      />
    </div>
  );
}

HomeImage.propTypes = {
  src: PropTypes.node,
  alt: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string
};

export default memo(HomeImage);
