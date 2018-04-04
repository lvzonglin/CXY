/**
 * IOT v1.0.0 (http://www.ito.com)
 * Copyright 2017-2018 IOT, Inc.

 * Created by 汉三.
 * time   : 2018/3/26.
 * Email  : 515124651@qq.com.
 */
import React,{Component} from 'react';
import DataList from '@/components/DataList';

import { iotUrl } from '@/api/url';

class Equipment extends Component{
  constructor(){
    super()
  }

  render(){
    const listConfig = {
      url:iotUrl.getProData,
      displayType:'table',
      columns : [{
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      }, {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      }, {
        title: '图片地址',
        dataIndex: 'imageUrl',
        key: 'imageUrl',
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#">Delete</a>
          </span>
        ),
      }]
    }
    return (
      <div>
        <DataList {...listConfig}/>
      </div>
    )
  }
}

export default Equipment
