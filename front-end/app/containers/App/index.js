/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import VsnPage from 'containers/VsnPage/Loadable';
import StocksPage from 'containers/StocksPage/Loadable';
import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s - Anish Khanna" defaultTitle="Anish Khanna" />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/vsn" component={VsnPage} />
        <Route exact path="/stocks" component={StocksPage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
