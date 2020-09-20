/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppBar, Toolbar, Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  firstButton: {
    marginLeft: 'auto'
  },
  background: {
    backgroundColor: props => props.backgroundColor
  },
  text: {
    color: props => props.color
  }
}));

export function Header(props) {
  const { color, backgroundColor } = props;

  const classes = useStyles({ color, backgroundColor });

  return (
    <AppBar className={classes.background} position="static">
      <Toolbar className={classes.background}>
        <p className={classes.text}>Anish Khanna</p>
        <Link component={RouterLink} className={classes.firstButton} to="/">
          <Button className={classes.text}>Home</Button>
        </Link>
        <Link component={RouterLink} to="/vsn">
          <Button className={classes.text}>vsn</Button>
        </Link>
        <Link component={RouterLink} to="/stocks">
          <Button className={classes.text}>Stocks</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.string,
  backgroundColor: PropTypes.string
};

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
)(Header);
