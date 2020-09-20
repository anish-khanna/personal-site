/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Grid, Divider, Link, Tabs, Tab, AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Email,
  LinkedIn,
  GitHub,
  SportsSoccerTwoTone,
  Brush,
  Fastfood,
  FlightTakeoff
} from '@material-ui/icons';
import Image from 'material-ui-image';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Header from 'containers/Header';
import profPic from 'static/images/prof pic.jpg';
import wize from 'static/images/wize.svg';
import huawei from 'static/images/Huawei.png';
import thomsonReuters from 'static/images/TR.png';
import d2l from 'static/images/D2L_logo.svg.png';
import sports from 'static/images/Sports.jpg';
import food from 'static/images/Food.jpg';
import travel from 'static/images/Travel.jpg';
import vsn from 'static/images/vsn logo.png';
import saga from './saga';
import reducer from './reducer';
import makeSelectHomePage from './selectors';
import TabPanel from '../../components/TabPanel';
import HomeImage from '../../components/HomeImage';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'white',
    minHeight: '100vh',
    height: '100%',
    width: '100%'
  },
  profileImg: {
    width: '90%',
    borderRadius: '50%'
  },
  widthConstrained: {
    maxWidth: '1400px',
    margin: 'auto',
    width: '95%',
    paddingTop: '50px'
  },
  introItem: {
    textAlign: 'center'
  },
  introText: {
    fontSize: '70px',
    fontFamily: 'Roboto'
  },
  contentWidthConstrained: {
    maxWidth: '1024px',
    margin: 'auto',
    width: '95%',
    fontFamily: 'Roboto',
    paddingTop: '50px'
  },
  companyImage: {
    width: '90%'
  },
  companyParent: {
    textAlign: 'center'
  },
  divider: {
    backgroundColor: 'black',
    marginTop: '40px',
    marginBottom: '40px'
  },
  subtitle: {
    paddingBottom: '30px'
  },
  lastSection: {
    marginBottom: '50px'
  },
  contactIcon: {
    fontSize: '50px'
  },
  tabsParent: {
    width: '100%',
    flexGrow: 1
  },
  tabs: {}
}));

export function HomePage() {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Header color="black" backgroundColor="white" />
      <div className={classes.widthConstrained}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4} align="center">
            <img className={classes.profileImg} src={profPic} alt="Profile" />
          </Grid>
          <Grid item xs={12} sm={8} className={classes.introItem}>
            <p className={classes.introText}>Hi! I'm Anish Khanna!</p>
          </Grid>
          <Grid container className={classes.contentWidthConstrained}>
            <Grid item xs={12} align="center" className={classes.subtitle}>
              <h1>A Little Bit About Me</h1>
            </Grid>
            <Grid item xs={12} align="center">
              <p>
                I'm a third year Computer Engineering student at the University
                of Waterloo with an interest and passion for Computer Science.
                In particular, I love working on web-development and seeing
                something I write appear on the web immediately. It's in this
                field that I have my main focus but I am always down to take on
                new and unique challenges, anything that is intriguing and
                meaningful even out of CS.
              </p>
              <Divider className={classes.divider} />
              <h1 className={classes.subtitle}>My Other Interests</h1>
              <div className={classes.tabsParent}>
                <AppBar
                  position="static"
                  color="inherit"
                  backgroundcolor="inherit"
                  style={{ marginBottom: '5px' }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    centered
                    variant="fullWidth"
                    className={classes.tabs}
                  >
                    <Tab icon={<SportsSoccerTwoTone />} label="Sports" />
                    <Tab icon={<Brush />} label="Art/Fashion" />
                    <Tab icon={<Fastfood />} label="Food" />
                    <Tab icon={<FlightTakeoff />} label="Travel" />
                  </Tabs>
                </AppBar>
                <TabPanel value={tabValue} index={0}>
                  <HomeImage
                    src={sports}
                    alt="sports"
                    maxWidth="100%"
                    maxHeight="600px"
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <HomeImage
                    src={vsn}
                    alt="art"
                    maxWidth="100%"
                    maxHeight="600px"
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <HomeImage
                    src={food}
                    alt="food"
                    maxWidth="100%"
                    maxHeight="600px"
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={3}>
                  <HomeImage
                    src={travel}
                    alt="travel"
                    maxWidth="100%"
                    maxHeight="600px"
                  />
                </TabPanel>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12} align="center" className={classes.subtitle}>
              <h1>My Previous Experiences</h1>
            </Grid>
            <Grid container alignItems="center" justify="center">
              <Grid item xs={12} sm={6} className={classes.companyParent}>
                <img
                  src={thomsonReuters}
                  alt="Thomson Reuters"
                  className={classes.companyImage}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.companyParent}>
                <img
                  src={d2l}
                  alt="Desire2Learn"
                  className={classes.companyImage}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.companyParent}>
                <img
                  src={huawei}
                  alt="Huawei Technologies"
                  className={classes.companyImage}
                />
              </Grid>
              <Grid item xs={12} sm={6} className={classes.companyParent}>
                <img
                  src={wize}
                  alt="Wize.ai"
                  className={classes.companyImage}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12} align="center" className={classes.subtitle}>
              <h1>Contact Me</h1>
            </Grid>
            <Grid
              container
              alignItems="center"
              justify="center"
              className={classes.lastSection}
            >
              <Grid item xs={2} align="center">
                <Link color="inherit" href="mailto:a26khann@uwaterloo.ca">
                  <Email className={classes.contactIcon} />
                </Link>
              </Grid>
              <Grid item xs={2} align="center">
                <Link
                  color="inherit"
                  href="http://www.linkedin.com/in/anish-khanna99"
                  target="_blank"
                >
                  <LinkedIn className={classes.contactIcon} />
                </Link>
              </Grid>
              <Grid item xs={2} align="center">
                <Link
                  color="inherit"
                  href="http://www.github.com/anish-khanna"
                  target="_blank"
                >
                  <GitHub className={classes.contactIcon} />
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

HomePage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  homePage: makeSelectHomePage()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(HomePage);
