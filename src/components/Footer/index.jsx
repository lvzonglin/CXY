/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React from 'react';
import { Layout} from 'antd';

import './index.less';

const { Footer } = Layout;

class CommonFooter extends React.Component{
  constructor(){
    super()
  }

  render(){
    return (
      <Footer style={{ textAlign: 'center' }}>
        IOT Design ©2018 Created by IOT
      </Footer>
    )
  }
}

export default CommonFooter
