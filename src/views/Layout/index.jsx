import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Layout,Affix,Row,Col } from 'antd';
import {Route,Redirect} from 'react-router-dom';

import Sidebar from '@/components/Sidebar';
import Header  from '@/components/Header';

import { logout } from '@/actions/auth';

const { Content,Footer } = Layout;

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
    return (
      <Layout>
        <Sidebar />
        <Layout>
          <Header/>

          <Content style={{ padding: '0 50px' }}>

          </Content>

          <Footer style={{ textAlign: 'center' }}>
            IOT Design ©2018 Created by IOT
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

App.propTypes = propTypes;

const mapStateToProps = (state) => {

}

export default App
