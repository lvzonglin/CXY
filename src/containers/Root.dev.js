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
