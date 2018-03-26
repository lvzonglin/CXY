import React,{ Component } from 'react';
import { Provider } from 'react-redux';

import route from '../route';
import { HashRouter as Router } from 'react-router-dom';

export default class Root extends Component{
  render(){
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router>
          {route}
        </Router>
      </Provider>
    )
  }
}
