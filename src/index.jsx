/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React from 'react';
import { render } from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();

render(
  <AppContainer>
    <Root store={store}/>
  </AppContainer>,
  document.getElementById('IOTK')
)

if(module.hot){
  module.hot.accept('./containers/Root',()=>{
    const RootContainer = require('./containers/Root').default;
    render(
      <AppContainer>
        <RootContainer store={store}/>
      </AppContainer>,
      document.getElementById('IOTK')
    )
  })
}
