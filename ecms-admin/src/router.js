import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from '../src/App';
import AppLayout from './components/Layout/index'
import Home from './pages/home';
import Role from './pages/role';
import User from './pages/user';
import Login from './pages/login';
import Permission from './pages/permission'

export default class ECMSRouter extends Component {
  render() {
    return(
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/" render={() => (
              <AppLayout>
                <Switch>
                  <Route path="/admin/role" component={Role}></Route>
                  <Route path="/admin/user" component={User}></Route>
                  <Route path="/admin/permission" component={Permission}></Route>       
                </Switch>
              </AppLayout>
            )}></Route>
            <Redirect to="/home"></Redirect>
          </Switch>
        </App>
      </HashRouter>
    )
  }
}
