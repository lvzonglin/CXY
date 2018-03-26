/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link,withRouter } from 'react-router-dom';
import { Layout,Divider,Icon,Row } from 'antd';

import './index.less';

const { Header } = Layout;

class CommonHeader extends React.Component{
  constructor(){
    super()
  }

  handleLogOut=()=>{
    const { logout } = this.props;
    logout().payload.promise.then((res)=>{
      this.props.history.replace('/login')
    }).catch((err)=>{

    })
  }

  render(){
    //TODO 需要从服务器获取用户信息
    const { profile } = this.props;

    return (
      <Header className="iot-header">
        <Row type="flex" justify="end" align="middle">
          <span className="username">
            <Icon type="user" />
            管理员
          </span>
          <Divider style={{backgroundColor: 'rgba(0, 0, 0, 0.65)',top:0}} type="vertical" />
          <span className="logout" onClick={this.handleLogOut}>
            <Icon type="logout" />
            退出
          </span>
        </Row>
      </Header>
    )
  }
}

export default withRouter(CommonHeader)
