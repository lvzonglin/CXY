/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React,{Component} from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';

import route from '../route';
import DevTools from './DevTools';

export default class Root extends Component {
  render(){
    const { store } = this.props;

    return (
      <Provider store = {store}>
        <div>
          <Router>
            {route}
          </Router>
        </div>
      </Provider>
    )
  }
}
