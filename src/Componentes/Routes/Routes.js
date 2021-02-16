import React, {  Fragment, } from 'react';
import Login from '../login/Login';
import HomeV1 from '../vendedor1/HomeV1';
import HomeAdmin from '../admin/HomeAdmin';

import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as
    Router,
  Switch,
  Route,


} from "react-router-dom";


function Routes() {

  return (
    
    <Fragment>
   
      <Router>
        <Switch>
          <Route path="/sistemaVenta" exact render={props => (<Login {...props} />)} >
          </Route>
          <Route path="/HomeVendedor" exact render={props => (<HomeV1 {...props} />)} >
          </Route>
          <Route path="/HomeAdmin" exact render={props => (<HomeAdmin {...props} />)} >
          </Route>
        </Switch>
      </Router>
    </Fragment>
  );



}
export default Routes;