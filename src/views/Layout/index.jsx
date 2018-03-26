/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */

import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Layout,Affix,Row,Col } from 'antd';
import {Route,Redirect,Switch} from 'react-router-dom';

import { childRoutes } from '@/route';
import authHOC from '@/utils/auth';

import Sidebar from '@/components/Sidebar';
import Header  from '@/components/Header';
import Footer  from '@/components/Footer';
import NavPath from '@/components/NavPath';
import { breadcrumbNameMap } from '@/route';
import { logout } from '@/actions/auth';

import './index.less';

const { Content } = Layout;

const propTypes = {
  auth:PropTypes.object,
  navpath:PropTypes.array
}

class App extends React.Component{
  constructor(props){
    super(props)
  }

  componentWillMount(){

  }

  render(){
    const { navpath,logout } = this.props;

    return (
      <Layout>
        <Sidebar />
        <Layout>
          <Header logout={logout}/>

          <Content className="iot-content">
            <NavPath/>
            <div className="">
              <div style={{ minHeight: 360 }}>
                <Switch>
                  {childRoutes.map((route, index) => (
                    <Route key={index} path={route.path} component={authHOC(route.component)} exact={route.exactly} />
                  ))}
                </Switch>
              </div>
            </div>
          </Content>

          <Footer/>
        </Layout>
      </Layout>
    )
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => {
  const { auth,menu } = state;
  return {
    auth:auth ? auth : null,
    navpath:menu.navpath
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    logout:bindActionCreators(logout,dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
