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

class User extends Component{
  constructor(){
    super()
  }

  render(){
    const listConfig = {
      url:iotUrl.getUserUrl,
      displayType:'table',
      columns : [{
        title: '序号',
        dataIndex: 'id',
        key: 'id'
      },{
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        render: text => <a href="#">{text}</a>,
      },{
        title: '登录账号',
        dataIndex: 'loginName',
        key: 'loginName',
      }, {
        title: '用户状态',
        dataIndex: 'state',
        key: 'state',
        render: (text, record) => {
          if (text===true){
            return '正常'
          }else{
            return '禁用'
          }
        }
      },{
        title: '创建时间',
        dataIndex: 'creatTime',
        key: 'creatTime',
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

export default User
