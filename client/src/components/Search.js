import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  applyRouterMiddleware
} from 'react-router';

import Explore from '../views/Explore';

import requireAuth from './requireAuth';

const createRoutes = (store) => {
  // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);
  return (
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={MainLayout}>
        <IndexRoute component={requireAuth(Home)} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile/edit" component={requireAuth(ProfileEdit)} />
        <Route path="/new-post" component={requireAuth(NewPost)} />
        <Route path="/explore/locations/:placeId" component={requireAuth(Locations)} />
        <Route path="/explore/tags/:tagName" component={requireAuth(Tags)} />
        <Route path="/explore" component={requireAuth(Explore)} />
        <Route path="/:username" component={requireAuth(Profile)} />
      </Route>
    </Router>
  );
};

export default createRoutes;