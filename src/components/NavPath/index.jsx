/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter,Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { breadcrumbNameMap } from '@/route';

import './index.less';

class NavPath extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const { location } = this.props;

    const pathSplit = location.pathname.split('/').filter(function(i){
      return !!i
    });
    const extraBreadcrumbItems = pathSplit.map((item,index)=>{
      const url = `/${pathSplit.slice(0,index+1).join('/')}`;

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    })
    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/">首页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
      <Breadcrumb separator=">" className="iot-breadcrumb">
        {breadcrumbItems}
      </Breadcrumb>
    )
  }
}

export default withRouter(NavPath);
