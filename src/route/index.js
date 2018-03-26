import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';

import Layout from '../views/Layout'
import Login 	from '../views/Login';

const routes = (
	<Switch>
		<Route path="/login" component={Login}/>
		<Route path="/" component={Layout}/>
	</Switch>
)

export default routes;
